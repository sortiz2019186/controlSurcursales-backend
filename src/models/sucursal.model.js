'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sucursalSchema = new Schema({
    nombreSucursal: { type: String, required: [true, 'El nombre de la sucursal es necesario.'] },
    direccionSucursal: { type: String, required: [true, 'La dirección de la sucursal es necesaria.'] },
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'empresas' }
});

module.exports = mongoose.model('sucursales', sucursalSchema);