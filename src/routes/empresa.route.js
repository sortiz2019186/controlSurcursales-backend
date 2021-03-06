'use strict'

const express = require('express');
let empresaController = require('../controllers/empresa.controller');

let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearEmpresa', [verificarToken, verificarAdminRole], empresaController.crearEmpresa);
api.post('/login', empresaController.login);
api.put('/modificarEmpresa', [verificarToken, verificarAdminRole], empresaController.modificarEmpresa);
api.delete('/eliminarEmpresa', [verificarToken, verificarAdminRole], empresaController.eliminarEmpresa);
api.get('/obtenerEmpresas', [verificarToken, verificarAdminRole], empresaController.obtenerEmpresas);
api.get('/obtenerEmpresa', [verificarToken, verificarAdminRole], empresaController.obtenerEmpresa);

module.exports = api;