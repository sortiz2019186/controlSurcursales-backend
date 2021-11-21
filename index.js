'use strict'

const mongoose = require('mongoose');

const app = require('./app');

// === Conexión a MongoDB ===
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@controlsucursales-2021.jdq2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Base de datos ONLINE!');

    app.listen(process.env.PORT || 3000, function() {
        console.log('Aplicación corriendo en el puerto 3000');
    });
}).catch(err => console.log(err));