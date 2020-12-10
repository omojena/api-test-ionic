const ListServices = require('../service/ListaService');
const {handleError, BadRequest, NotFound} = require('../../../ErrorResorces');
const express = require('express');

class IdentityController {

    constructor() {
        this.router = express.Router();
        this.init()
    }

    init() {
        this.router.get('/lists', this.getAll.bind(this));
        this.router.get('/list/:_id', this.getById.bind(this));
        this.router.post('/list', this.create.bind(this));
        this.router.put('/list', this.update.bind(this));
        this.router.delete('/list/:_id', this.delete.bind(this));
    }

    get Router() {
        return this.router;
    }

    getAll(req, res) {
        ListServices.findAll()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    getById(req, res) {
        const _id = req.params;
        if(!_id) return handleError(res, new BadRequest('"id" es requerido'));
        ListServices.findById(_id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                handleError(res, new BadRequest(error.message));
            })
    }

    create(req, res) {
        const {lista, tirada, limpio, bruto, premio, fecha, clave} = req.body;
        ListServices.create({lista, tirada, limpio, bruto, premio, fecha, clave, createBy: req.user})
            .then(response => {
                res.status(201).send(response);
            })
            .catch(reason => {
                res.send(reason);
            })
    }

    update(req, res) {
        const {clave, ...list} = req.body;
        if(!clave) return handleError(res, new BadRequest('"id" es requerido'));
        ListServices.findOne({clave})
            .then((dbList) => {
                if (dbList) {
                    ListServices.updateById(dbList._id, list)
                        .then(() => {
                            res.send({_id: dbList._id});
                        })
                        .catch(error => {
                            handleError(res, new BadRequest(error.message));
                        })
                } else {
                    handleError(res, new NotFound('List Not Found'));
                }
            })
            .catch(() => {
                handleError(res, new NotFound('List Not Found'));
            })
    }

    delete(req, res) {
        const {_id} = req.params;
        if(!_id) return handleError(res, new BadRequest('"id" es requerido'));
        ListServices.findById(_id)
            .then(() => {
                ListServices.delete(_id)
            }).catch(() => {
            handleError(res, new NotFound('List Not Found'));
        })
    }

}

module.exports = IdentityController;
