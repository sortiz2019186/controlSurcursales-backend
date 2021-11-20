'use strict'

const Sucursal = require('../models/sucursal.model');
const auth = require('../middleware/authenticated');

// === CREAR SUCURSAL ===
function crearSucursal(req, res) {
    let body = req.body;
    let sucursal = new Sucursal({
        nombreSucursal: body.nombreSucursal,
        direccionSucursal: body.direccionSucursal,
        idEmpresa: req.usuario.sub
    });

    sucursal.save((err, sucursalCreada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!sucursalCreada) {
            return res.status(500).send({ ok: false, message: 'Error al crear la sucursal.' });
        }

        return res.status(200).send({ ok: true, sucursalCreada });
    });
}

// === OBTENER SUCURSALES ===
function obtenerSucursales(req, res) {
    Sucursal.find().populate().exec((err, sucursalesEncontradas) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!sucursalesEncontradas) {
            return res.status(404).send({ ok: false, message: 'Error en la consulta o no existen datos.' });
        }

        return res.status(200).send({ ok: true, sucursalesEncontradas });
    });
}

// === OBTENER SUCURSAL POR ID ===
function obtenerSucursal(req, res) {
    let id = req.params.id;

    Sucursal.findById(id, (err, sucursalEncontrada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!sucursalEncontrada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, sucursalEncontrada });
    });
}

// === MODIFICAR SUCURSAL ===
function modificarSucursal(req, res) {
    let id = req.params.id;
    let body = req.body;

    delete body.idEmpresa;

    Sucursal.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, sucursalModificada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!sucursalModificada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, sucursalModificada });
    });
}

// === ELIMINAR SUCURSAL ===
function eliminarSucursal(req, res) {
    let id = req.params.id;

    Sucursal.findByIdAndDelete(id, { useFindAndModify: true }, (err, sucursalEliminada) => {
        if (err) {
            return res.sstatus(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!sucursalEliminada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, sucursalEliminada });
    });
}

module.exports = {
    crearSucursal,
    obtenerSucursales,
    obtenerSucursal,
    modificarSucursal,
    eliminarSucursal
}