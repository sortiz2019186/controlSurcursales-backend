'use strict'

const express = require('express');
let productoSucursalController = require('../controllers/productoSucursal.controller');

let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crear/productoSucursal', [verificarToken, verificarAdminRole], productoSucursalController.crearProduto);
api.get('/obtener/productosSucursal', [verificarToken, verificarAdminRole], productoSucursalController.obtenerProductos);
api.get('/obtener/productoSucursal/:id', [verificarToken, verificarAdminRole], productoSucursalController.obtenerProducto);
api.put('/modificar/productoSucursal/:id', [verificarToken, verificarAdminRole], productoSucursalController.modificarProducto);
api.delete('/eliminar/productoSucursal/:id', [verificarToken, verificarAdminRole], productoSucursalController.eliminarProducto);

module.exports = api;