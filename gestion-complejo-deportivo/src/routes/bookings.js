const express = require('express');
const router = express.Router();

//Referencia a la conexión a la base de datos
const pool = require('../database');


router.get('/create', (req, res) => {
    res.render('bookings/create');
});

router.get('/list', (req, res) => {
    res.render('bookings/list');
});

router.post('/create', async (req, res) => {
    const { id_cancha, fecha_reserva, hora_reserva, ci_cliente} = req.body;
    const status = "Libre";
    const id_reserva = makeid(10);
    
    //Objeto de la reserva
    const newBooking = {
        hora_reserva,
        fecha_reserva,
        id_reserva,
        //created_at
        status,
        ci_cliente,
        id_cancha
    };
    await pool.query('INSERT INTO reserva set ?', [newBooking]);
    res.render('bookings/list');
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

//Datatable export buttons 

module.exports = router;