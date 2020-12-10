const UserServices = require('../service/UserServices');
const {BadRequest, handleError} = require('../../../ErrorResorces');
const express = require('express');
const jwt = require('jsonwebtoken');

class UserController {

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.get('/users', this.getAll.bind(this));
        this.router.get('/user/:_id', this.getById.bind(this));
        this.router.post('/user/register', this.create.bind(this));
        this.router.post('/user/login', this.login.bind(this));
        this.router.put('/user/:_id', this.update.bind(this));
        this.router.delete('/user/:_id', this.delete.bind(this));
    }

    get Router() {
        return this.router;
    }

    login(req, res) {
        console.log(req.body);
        const {username, password} = req.body;

        if (!username) return handleError(res, new BadRequest('Username is required'));
        UserServices.verifyUser(username)
            .then(response => {
                if (response && UserServices.validPassword(password, response.password)) {
                    const claim = UserServices.mapClaim(response);
                    const token = jwt.sign({...claim}, process.env.JWT_KEY);
                    res.status(200).send({token, user: response})
                } else {
                    handleError(res, new BadRequest('Bad credentials'));
                }
            })
            .catch((reason) => {
                console.log(reason);
                handleError(res, new BadRequest('Bad credentials'));
            });
    }

    getAll(req, res) {
        UserServices.findAll()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    getById(req, res) {
        const _id = req.params;
        if (!_id) handleError(res, new BadRequest('"id" is required'));
        UserServices.findById(_id)
            .then(response => {
                res.send(response);
            })
            .catch(() => {
                handleError(res, new BadRequest('User not found'));
            })
    }

    create(req, res) {
        const {username, fullName, password} = req.body;
        if (!username) return handleError(res, new BadRequest('Username is required'));
        if (!fullName) return handleError(res, new BadRequest('The name is required'));
        if (!password) return handleError(res, new BadRequest('Password is required'));

        UserServices.create(req.body)
            .then(response => {
                res.status(201).send(response);
            })
            .catch(reason => {
                console.log(reason);
                handleError(res, new BadRequest(reason.message));
            })
    }

    update(req, res) {
        const {_id} = req.params;
        const user = req.body;
        if (!_id) return handleError(res, new BadRequest('"id" es requerido'));
        UserServices.findById(_id)
            .then(() => {
                UserServices.updateById(_id, user)
                    .then(() => {
                        res.send({_id});
                    })
                    .catch(error => {
                        handleError(res, new BadRequest(error.message));
                    })
            })
            .catch((error) => {
                handleError(res, new BadRequest(error.message));
            })

    }

    delete(req, res) {
        const {_id} = req.params;
        if (!_id) return handleError(res, new BadRequest('"id" is required'));
        UserServices.findById(_id)
            .then(() => {
                UserServices.delete(_id)
            }).catch(() => {
            handleError(res, new BadRequest('User Not Found'));
        })
    }


}

module.exports = UserController;

