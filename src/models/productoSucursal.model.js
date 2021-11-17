'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSucursalSchema = new Schema({
    nombreProducto: { type: String, required: [true, 'El nombre del producto es necesario.'] },
    stockExistente: { type: Number, required: [true, 'La cantidad existente es necesaria.'] },
    cantidadVendida: { type: Number, default: 'null' }
});

module.exports = mongoose.model('productoSucursales', productoSucursalSchema);