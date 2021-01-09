const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');


const app = express();
require('./lib/passport');

const {database} = require('./keys.js');


/* Configuracion para el motor de plantillas y las vistas */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



/* Configuracion de algunos middelwares para nuesta api*/
app.use(session({
    secret: "softpro",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((request, response, next) => {
    console.log(request.usuario);
    app.locals.user = request.user;
    next();
});


/* Configuracion de las rutas de nuetra Api*/
app.use('/oauth', require('./routes/autenticacion.js'));
app.use('/vuelo', require('./routes/vuelo.js'));


/* Configuracion de los archivos estaticos, Directory Public */
app.use(express.static(path.join(__dirname,'public')));


app.listen(app.get('port'), () => {
    console.log("Servidor corriendo");
    console.log("Puerto: ", app.get('port'));
})
