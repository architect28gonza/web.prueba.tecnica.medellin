const passport = require('passport');
const passport_local = require('passport-local');
const LocalStrategy = passport_local.Strategy;

const pool = require('../database/conexionDatabase.js');
const encriptado = require('../lib/cifradoContrasena');


passport.use('session.local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, username, password, done) => {

    const resultados = await  pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
    if (resultados.length > 0) {
        const usuario = resultados[0];
       const validacionContrasena = await encriptado.compararPassword(password, usuario.password);
        if (validacionContrasena) {
            done(null, usuario);
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.cedula);
});

passport.deserializeUser(async function(cedula, done) {
    await pool.query('SELECT * FROM usuario WHERE cedula = ?', [cedula], (err, rows) => {
        if(err){
            console.log(err);
            return done(null,err);
        }
        done(null, rows[0]);
    });
});