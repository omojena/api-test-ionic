const IdentityServices = require('../service/IdentityService');
const {handleError, BadRequest, NotFound} = require('../../../ErrorResorces');
const express = require('express');

class IdentityController {

    constructor() {
        this.router = express.Router();
        this.init()
    }

    init() {
        this.router.get('/identity/list', this.getAll.bind(this));
        this.router.get('/identity/:_id', this.getById.bind(this));
        this.router.get('/identity/user/:_id', this.getByUserId.bind(this));
        this.router.post('/identity', this.create.bind(this));
        this.router.put('/identity', this.update.bind(this));
        this.router.delete('/identity/:_id', this.delete.bind(this));
    }

    get Router() {
        return this.router;
    }

    getAll(req, res) {
        IdentityServices.findAll()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    getById(req, res) {
        const _id = req.params;
        if (!_id) return handleError(res, new BadRequest('"id" is required'));
        IdentityServices.findById(_id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    getByUserId(req, res) {
        const _id = req.params;
        if (!_id) return handleError(res, new BadRequest('"id" is required'));
        IdentityServices.findByUserId(_id)
            .then(response => {
                const claim = IdentityServices.mapClaim(response);
                res.status(200).send(claim);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    create(req, res) {
        IdentityServices.create({user_id: req.user, ...req.body})
            .then(response => {
                res.status(201).send(response);
            })
            .catch(reason => {
                res.send(reason);
            })
    }

    update(req, res) {
        const {_id} = req.params;
        const identity = req.body;
        if (!_id) return handleError(res, new BadRequest('"id" is required'));
        IdentityServices.findById(_id)
            .then(() => {
                IdentityServices.updateById(_id, identity)
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
        IdentityServices.findById(_id)
            .then(() => {
                IdentityServices.delete(_id)
            }).catch(() => {
            handleError(res, new NotFound('Identity Not Found'));
        })
    }


}

module.exports = IdentityController;
