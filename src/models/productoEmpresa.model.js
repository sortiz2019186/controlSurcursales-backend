'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoEmpresaSchema = new Schema({
    nombreProducto: { type: String, required: [true, 'El nombre del producto es necesario.'] },
    nombreProveedor: { type: String, required: [true, 'El nombre del proveedor es necesario.'] },
    stock: { type: Number, require: [true, 'La cantidad del stock es necesario.'] }
});

module.exports = mongoose.model('productoEmpresas', productoEmpresaSchema);