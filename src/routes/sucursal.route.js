'use strict'

const express = require('express');
let sucursalController = require('../controllers/sucursal.controller');

// Middleware
let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearSucursal', [verificarToken, verificarAdminRole], sucursalController.crearSucursal);
api.get('/obtenerSucursales', [verificarToken, verificarAdminRole], sucursalController.obtenerSucursales);
api.get('/obtenerSucursal/:id', [verificarToken, verificarAdminRole], sucursalController.obtenerSucursal);
api.put('/modificarSucursal/:id', [verificarToken, verificarAdminRole], sucursalController.modificarSucursal);
api.delete('/eliminarSucursal/:id', [verificarToken, verificarAdminRole], sucursalController.eliminarSucursal);

module.exports = api;