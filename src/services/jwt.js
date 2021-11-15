'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'seed-de-desarrollo';

function createToken(usuario) {
    let payload = {
        sub: usuario._id,
        rol: usuario.rol,
        username: usuario.username,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}

module.exports = {
    createToken
}