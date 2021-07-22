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
    const { user, cancha, date_booking } = req.body;
    
    //Objeto de la reserva
    const newBooking = {
        user,
        cancha,
        date_booking,
    };
    await pool.query('INSERT INTO booking set ?', [newBooking]);
    req.flash('success', 'Reserva añadida correctamente');
    res.redirect('./list');
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