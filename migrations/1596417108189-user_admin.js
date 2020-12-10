'use strict';
require('dotenv').config();
const mongodb = require('mongodb');
const Bluebird = require('bluebird');
const bycrypt = require('bcrypt');
const MongoClient = mongodb.MongoClient;
Bluebird.promisifyAll(MongoClient);
const URL = process.env.APP_MONGO_URL;

module.exports.up = function (next) {
    let mClient = null;
    MongoClient.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(client => {
            mClient = client;
            return mClient.db();
        })
        .then(async db => {
            const User = db.collection('users');
            const user = {
                username: "admin",
                fullName: "Admin",
                password: bycrypt.hashSync(process.env.APP_ADMIN_PASSWORD, bycrypt.genSaltSync()),
            };

            const dbUser = await User.findOne({username: user.username});
            if (!dbUser) {
                const insertUser = await User.insertOne(user);
                console.log(`Admin user ${insertUser.username} inserted.`)
            }
            mClient.close();
            next();
        });
};

module.exports.down = function (next) {
    next()
};

