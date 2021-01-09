const msyql = require('mysql');
const {promisify} = require('util');
const {database} = require('../keys');

const pool = msyql.createPool(database);

pool.getConnection((err, connection) => {
    if(err) {
        switch (err.code) {
            case "PROTOCOL_CONNECTION_LOST":
                console.log("La conexion con la base de datos fue cerrada");
                break;
            case "ER_CON_COUNT_ERROR":
                console.log("La conexion de base de datos tiene muchas conexiones");
                break
            case "ECONNREFUSED":
                console.log("Credenciales incorrectas ");
                break;
        }
    }
    if (connection) connection.release();
    console.log("Conectado en la base de datos !!");
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;