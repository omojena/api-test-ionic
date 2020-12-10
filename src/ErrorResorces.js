class BadRequest extends Error {
    constructor(message = 'Algo salio mal') {
        super(message);
        this.name = 'BadRequestError';
    }

    get statusCode() {
        return 400;
    }

    get error() {
        return this.name.toUpperCase();
    }
}

class NotAuthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotAuthorizedError';
    }

    get statusCode() {
        return 401;
    }

    get error() {
        return this.name.toUpperCase();
    }
}

class Forbidden extends Error {
    constructor(message = 'Permiso denegado') {
        super(message);
        this.name = 'ForbiddenError';
    }

    get statusCode() {
        return 403;
    }

    get error() {
        return this.name.toUpperCase();
    }
}


class NotFound extends Error {
    constructor(message = 'Objeto no encontrado') {
        super(message);
        this.name = 'NotFoundError';
    }

    get statusCode() {
        return 404;
    }

    get error() {
        return this.name.toUpperCase();
    }
}

class InternalError extends Error {
    constructor(message = 'Error del servidor') {
        super(message);
        this.name = 'InternalErrorError';
    }

    get statusCode() {
        return 500;
    }

    get error() {
        return this.name.toUpperCase();
    }
}

const handleError = (res, error) => {
    res.status(error.statusCode).send({error: error.error, message: error.message, statusCode: error.statusCode})
}

module.exports = {
    BadRequest,
    NotAuthorized,
    Forbidden,
    NotFound,
    InternalError,
    handleError
};


