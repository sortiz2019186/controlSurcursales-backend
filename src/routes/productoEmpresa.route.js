'use strict'

const express = require('express');
let productoEmpresaController = require('../controllers/productoEmpresa.controller');

let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearProducto', [verificarToken, verificarAdminRole], productoEmpresaController.crearProducto);
api.get('/obtenerProductos', [verificarToken, verificarAdminRole], productoEmpresaController.obtenerProductos);
api.get('/obtenerProducto/:id', [verificarToken, verificarAdminRole], productoEmpresaController.obtenerProducto);
api.put('/modificarProducto/:id', [verificarToken, verificarAdminRole], productoEmpresaController.modificarProducto);
api.delete('/eliminarProducto/:id', [verificarToken, verificarAdminRole], productoEmpresaController.eliminarProducto);

module.exports = api;