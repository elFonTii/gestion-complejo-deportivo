const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

//Referencia a la conexión a la base de datos
const pool = require('../database');


router.get('/create', isLoggedIn , (req, res) => {
    res.render('bookings/create');
});

router.get('/', isLoggedIn , async (req, res) => {
   const bookings = await pool.query('SELECT create_at, date_booking, id_booking, start_booking, end_booking, tipo_cancha, price FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
    res.render('bookings/list', {bookings: bookings});
});

router.post('/create', isLoggedIn , async (req, res) => {
    const { user, cancha, start_booking, end_booking, date_booking } = req.body;
    
    //Objeto de la reserva
    const newBooking = {
        //Los nombres de las variables del objeto 'newBooking' deben ser coincidentes con los de la tabla 'booking'.
        user,
        cancha,
        date_booking,
        start_booking,
        end_booking
    };
    await pool.query('INSERT INTO booking set ?', [newBooking]);
    req.flash('success', 'Reserva añadida correctamente');
    res.redirect('/bookings');
});

router.get('/delete/:id_booking', isLoggedIn , async (req, res) => {
    const id_booking = req.params.id_booking;
    await pool.query('DELETE FROM booking WHERE id_booking = ?', [id_booking]);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/bookings');
});


module.exports = router;