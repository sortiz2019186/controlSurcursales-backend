'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rolesValidos = {
    values: ['admin'],
    message: '{VALUE} no es un rol válido'
}

let empresaSchema = new Schema({
    rol: { type: String, default: 'admin', enum: rolesValidos, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Eliminar "password" de la respuesta
empresaSchema.methods.toJSON = function() {
    let empresa = this;
    let empresaObject = empresa.toObject();
    delete empresaObject.password;

    return empresaObject;
}

module.exports = mongoose.model('empresas', empresaSchema);