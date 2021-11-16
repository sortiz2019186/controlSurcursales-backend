'use strict'

const ProductoEmpresa = require('../models/productoEmpresa.model')
const auth = require('../middleware/authenticated');

// === CREAR PRODUCTO ===
function crearProducto(req, res) {
    let body = req.body;
    let productoEmpresa = new ProductoEmpresa({
        nombreProducto: body.nombreProducto,
        nombreProveedor: body.nombreProveedor,
        stock: body.stock
    });

    productoEmpresa.save((err, productoCreado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!productoCreado) {
            return res.status(500).send({ ok: false, message: 'Error al crear el producto.' });
        }

        return res.status(200).send({ ok: true, productoCreado });
    });
}

// === OBTENER PRODUCTOS ===
function obtenerProductos(req, res) {
    ProductoEmpresa.find((err, productosEncontrados) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la peticion.' });
        }

        if (!productosEncontrados) {
            return res.status(404).send({ ok: false, message: 'Error en la consulta o no existen datos.' });
        }

        return res.status(200).send({ ok: true, productosEncontrados });
    });
}

// === OBTENER PRODUCTO ===
function obtenerProducto(req, res) {
    let id = req.params.id;

    ProductoEmpresa.findById(id, (err, productoEncontrado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!productoEncontrado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, productoEncontrado });
    });
}

// === MODIFICAR PRODUCTO ===
function modificarProducto(req, res) {
    let id = req.params.id;
    let body = req.body;

    ProductoEmpresa.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, productoModificado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!productoModificado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, productoModificado });
    });
}

// === ELIMINAR PRODUCTO ===
function eliminarProducto(req, res) {
    let id = req.params.id;

    ProductoEmpresa.findByIdAndDelete(id, { useFindAndModify: true }, (err, productoEliminado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!productoEliminado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, productoEliminado });
    });
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    modificarProducto,
    eliminarProducto
}