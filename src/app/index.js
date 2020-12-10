const http = require('http');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Modules = require('../modules');
const {createAuthenticationMiddleware} = require('../middleware/auth');
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:4200'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
};

class Server {

    constructor() {
        this.app = express();
        this.mongoURL = process.env.APP_MONGO_URL;
        this.PORT = process.env.PORT || 8000;
        this.JWT_KEY = process.env.JWT_KEY;
    }

    start() {
        this._dbConnect();
        this._applyMiddleware();
        this._initModules();
        this._initApp();
    }

    _dbConnect() {
        mongoose.connect(this.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.once('open', _ => {
            console.log('Database connected: ', this.mongoURL)
        });

        db.on('error', err => {
            console.error('connection error:', err)
        });
    }

    _applyMiddleware() {
        this.app.use(cors());
        this.app.options('*', cors(corsOptions));
        this.app.set('key', this.JWT_KEY);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

    }

    _initApp() {
        return http.createServer(this.app)
            .listen(this.PORT, () => console.log(`HTTP Server Listening on port ${this.PORT}!`));
    }

    _initModules() {
        const modules = Object.keys(Modules);
        this.app.use('/api', createAuthenticationMiddleware());
        modules.forEach(key => {
            this._initModule(Modules[key]);
        });
    }

    _initModule(module) {
        const controllers = Object.keys(module.Controller);
        controllers.forEach(key => {
            const Controller = module.Controller[key];
            const RouterController = new Controller();
            this.app.use('/api', RouterController.Router);
        })
    }
}

module.exports = Server;
