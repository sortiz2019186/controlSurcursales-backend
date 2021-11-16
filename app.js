'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// === Importación de Rutas ===
let empresaRutas = require('./src/routes/empresa.route');
let sucursalRutas = require('./src/routes/sucursal.route');
let productoEmpresasRutas = require('./src/routes/productoEmpresa.route');

// === Middlewares ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === Cabeceras ===
// app.use(cors());

// === Aplicación de Rutas ===
app.use('/api', empresaRutas, sucursalRutas, productoEmpresasRutas);

module.exports = app;