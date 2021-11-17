'use strict'

const ProductoSucursal = require('../models/productoSucursal.model');

// === CREAR PRODUCTO ===
function crearProduto(req, res) {
    let body = req.body;
    let productoSucursal = new ProductoSucursal({
        nombreProducto: body.nombreProducto,
        stockExistente: body.stockExistente,
        cantidadVendida: body.cantidadVendida
    });

    productoSucursal.save((err, productoCreado) => {
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
    ProductoSucursal.find((err, productosEncontrados) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!productosEncontrados) {
            return res.status(404).send({ ok: false, message: 'Error en la consulta o no existen datos para mostrar.' });
        }

        return res.status(200).send({ ok: true, productosEncontrados });
    });
}

// === OBTENER PRODUCTO ===
function obtenerProducto(req, res) {
    let id = req.params.id;

    ProductoSucursal.findById(id, (err, productoEncontrado) => {
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

    ProductoSucursal.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, productoModificado) => {
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

    ProductoSucursal.findByIdAndDelete(id, { useFindAndModify: true }, (err, productoEliminado) => {
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
    crearProduto,
    obtenerProductos,
    obtenerProducto,
    modificarProducto,
    eliminarProducto
}