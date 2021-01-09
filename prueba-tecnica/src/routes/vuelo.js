const express = require('express');
const router = express.Router();

const pool = require('../database/conexionDatabase');

let query = "SELECT " +
    " aeropuerto_origen.*," +
    "    aeropuerto_destino.*," +
    "    horario_salida.*, " +
    "    horario_llegada.*, " +
    "    tarifa.*, " +
    "    vue.* " +
    "FROM vuelo vue " +
    "INNER JOIN aeropuerto_origen ON vue.ID_vuelo = aeropuerto_origen.ID_vuelo " +
    "INNER JOIN aeropuerto_destino ON vue.ID_vuelo = aeropuerto_destino.ID_vuelo " +
    "INNER JOIN horario_salida ON vue.ID_vuelo = horario_salida.ID_vuelo " +
    "INNER JOIN horario_llegada ON vue.ID_vuelo = horario_llegada.ID_vuelo " +
    "INNER JOIN tarifa ON vue.ID_vuelo = tarifa.ID_vuelo ";


router.post('/reserva', async (request, response) => {

    const {ID_reserva, cedula} = request.body;
    await pool.query('SELECT numero_tarjeta FROM tarjeta WHERE cedula = ?', [cedula], async (err, rows) => {
        if (err) {
            response.json({"message": "Error de consulta", "status": 400});
        }
        const json = {
           "ID_reserva": ID_reserva,
           "numero_tarjeta": rows[0].numero_tarjeta
        };
        await pool.query('INSERT INTO reserva set ?', [json], (err, res) => {
            if (err) { response.json({"message": "Error de consulta", "status": 400}); }
            response.json({"message": "completado", "status": 200});
        });
    });
});

router.post('/vuelo_reserva', async (request, response) => {
    const {ID_vuelo, estado, fecha_vuelo, id_vuelo_reserva, ID_reserva} = request.body;

    const json = { ID_vuelo, estado, fecha_vuelo };
    await pool.query('INSERT INTO vuelo set ?', [json], async (err, rows) => {
        if (err) {
            response.json({"message": "Error, no se pudo realizar la isertacion", "status": 400});
        }
        const reserva_vuelo = { id_vuelo_reserva, ID_reserva, ID_vuelo };
        await pool.query('INSERT INTO reserva_vuelo set ?', [reserva_vuelo], (err, res) => {
            if (err) {
                response.json({"message": "Error, no se pudo realizar la isertacion", "status": 400});
            }
            response.json({"message": "Completa con exito", "status":200});
        })
    });
});

router.post('/tarifa', async (request, response) => {
    const {ID_tarifa, clase_tarifa, precio, ID_vuelo} = request.body;
    const json = { ID_tarifa, clase_tarifa, precio, ID_vuelo };
    await pool.query('INSERT INTO tarifa set ?', [json], async (err, row) => {
        if (err) response.json({"message": "Error, no se pudo realizar la isertacion", "status": 400});
        response.json({"message": "Completa con exito", "status":200});
    });
})

router.post('/horario', async (request, response) => {
   const {
       nombre_aeropuerto, ciudad_origen,
       nombre_aeropuerto1, ciudad_destino,
       dia_salida, hora_salida,
       dia_llegada, hora_llegada,
       ID_vuelo
   } = request.body;

   const jsonAeropuerto1 = { nombre_aeropuerto, ciudad_origen, ID_vuelo };
   const jsonAeropuerto2 = { "nombre_aeropuerto": nombre_aeropuerto1, ciudad_destino, ID_vuelo};
   const json_dia_salida = {dia_salida, hora_salida, ID_vuelo};
   const json_dia_llegada = {dia_llegada, hora_llegada, ID_vuelo};

   await pool.query('INSERT INTO aeropuerto_origen set ?', [jsonAeropuerto1], async (err, row) => {
       if (err) response.json({"message": "Error, no se pudo realizar la isertacion 1", "status": 400});
       await pool.query('INSERT INTO aeropuerto_destino set ?', [jsonAeropuerto2], async (err, row) => {
           if (err) response.json({"message": "Error, no se pudo realizar la isertacion 2", "status": 400});

           await pool.query('INSERT INTO horario_salida set ?', [json_dia_salida], async (err, row) => {
               if (err) response.json({"message": "Error, no se pudo realizar la isertacion 3", "status": 400});
               await pool.query('INSERT INTO horario_llegada set ?', [json_dia_llegada], async (err, row) => {
                   if (err) response.json({"message": "Error, no se pudo realizar la isertacion 4", "status": 400});
                   response.json({"message": "Registro completado con exito", "status": 200});
               });
           });
       });
   });
});

router.post('/consulta', async (request, response) => {
    const {estado} = request.body;
    let  valor;
    switch (estado) {
        case 1:
            query += "WHERE horario_salida.hora_salida = ?";
            valor = request.body.hora;
            break
        case 2:
            query += "WHERE tarifa.precio = ?";
            valor = request.body.tarifa;
            break
        case 3:
            query += "WHERE vue.estado = ?";
            valor = request.body.estado;
            break
    }
    await pool.query(query, [valor], (err, rows) => {
        if (err) response.json({"message": "Error, no se pudo realizar la consulta", "status": 400});

        response.json({"message": "exito", "status": 200, "data": rows});
    });;
})




module.exports = router;