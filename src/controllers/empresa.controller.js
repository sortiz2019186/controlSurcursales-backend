'use strict'

const bcrypt = require('bcrypt');
const Empresa = require('../models/empresa.model');
const jwt = require('../services/jwt');
const auth = require('../middleware/authenticated');

// === CREAR EMPRESA ===
function crearEmpresa(req, res) {
    let body = req.body;
    let empresa = new Empresa({
        rol: body.rol,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10)
    });

    empresa.save((err, empresaCreada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!empresaCreada) {
            return res.status(500).send({ ok: false, message: 'Error al crear la empresa.' });
        }

        return res.status(200).send({ ok: true, empresaCreada });
    });
}

// === LOGIN ===
function login(req, res) {
    let body = req.body;

    Empresa.findOne({ username: body.username }, (err, usuarioLogueado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición' });
        }

        if (!usuarioLogueado) {
            return res.status(404).send({ ok: false, message: 'El usuario ingresado no existe.' });
        }

        // Compara las contraseñas
        if (!bcrypt.compareSync(body.password, usuarioLogueado.password)) {
            return res.status(401).send({ ok: false, message: 'La contraseña es incorrecta.' });
        }

        return res.status(200).send({ ok: true, token: jwt.createToken(usuarioLogueado) });
    });
}

// === OBTENER EMPRESAS ===
function obtenerEmpresas(req, res) {
    Empresa.find((err, empresasEncontradas) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!empresasEncontradas) {
            return res.status(404).send({ ok: false, message: 'Error en la consulta o no existen datos.' })
        }

        return res.status(200).send({ ok: true, empresasEncontradas });
    });
}

// === MODIFICAR EMPRESA ===
function modificarEmpresa(req, res) {
    let tokenUser = req.usuario;
    let body = req.body;

    delete body.password

    Empresa.findOneAndUpdate(tokenUser.sub, body, { new: true, useFindAndModify: true }, (err, empresaModificada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!empresaModificada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, empresaModificada });
    });
}

// === ELIMINAR EMPRESA ===
function eliminarEmpresa(req, res) {
    let tokenUser = req.usuario;

    Empresa.findOneAndDelete(tokenUser.sub, { useFindAndModify: true }, (err, empresaEliminada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!empresaEliminada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, empresaEliminada });
    });
}

module.exports = {
    crearEmpresa,
    login,
    modificarEmpresa,
    eliminarEmpresa,
    obtenerEmpresas,
}