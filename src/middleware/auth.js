const express_jwt = require('express-jwt');

module.exports.createAuthenticationMiddleware = () => express_jwt({
    secret: process.env.JWT_KEY,
    credentialsRequired: false
});



