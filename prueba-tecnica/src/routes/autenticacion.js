const express = require('express');
const router = express.Router();

const pool = require('../database/conexionDatabase');
const passport = require('passport');
const encriptacion = require('../lib/cifradoContrasena');


router.get('/bienvenido', (request, response) => {
    response.render('pageVuelo.html')
});

router.get('/login', (request, response) => {
    response.render("login.html");
});

router.get('/cerrar', (request, response) => {
    request.logOut();
    response.redirect('/oauth/login');
});


router.post('/login', (request, response, next) => {
    passport.authenticate('session.local', {
        successRedirect: '/oauth/bienvenido',
        failureRedirect: '/oauth/login'
    })(request, response, next)
});

router.get('/registro', (request, response) => {
    response.render("registro.html");
});

router.post('/agregar',async (request, response) => {
    const {cedula, nombre, apellidos, telefono, direccion, ciudad, username, password} = request.body;
    const informacionAlmacenar = {
        username,
        password,
        cedula,
        nombre,
        apellidos,
        telefono,
        direccion,
        ciudad
    }
    try {
        informacionAlmacenar.password = await encriptacion.encriptarPassword(informacionAlmacenar.password);

        await pool.query('INSERT INTO usuario set ?', [informacionAlmacenar]);
        response.send('completado');
    } catch (e) {
        console.log(e);
    }
})

router.post('/tarjeta', async (request, response) => {
    const {numero_tarjeta,nombre_tarjeta,expedida,vencimiento,expedidor,cedula} = request.body;
    const informacionAlmacenar = {
        numero_tarjeta,
        nombre_tarjeta,
        expedida,
        vencimiento,
        expedidor,
        cedula
    };
    try {
        await pool.query('INSERT INTO tarjeta set ?', [informacionAlmacenar]);
        response.send("Completado");
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;