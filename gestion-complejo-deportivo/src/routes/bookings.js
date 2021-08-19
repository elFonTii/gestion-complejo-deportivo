const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth');
const felino = require('../lib/felino_api');

const notis = require('../lib/notifications');
//Referencia a la conexión a la base de datos
const pool = require('../database');


router.get('/create', isLoggedIn , async (req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    res.render('bookings/create', {cancha: cancha});
});

router.get('/create/new/:id_cancha', isLoggedIn, async (req, res) => {
    const cancha = req.params.id_cancha;
    const data = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [cancha]);
    res.render('bookings/new', {cancha: cancha, data: data});
})

router.get('/', isLoggedIn , async (req, res) => {
   const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE user = ?',[req.user.username]);
    res.render('bookings/list', {bookings: bookings});
});

router.post('/create/new', isLoggedIn , async (req, res) => {
    var actual_date = new Date();
    var max_date = new Date(actual_date.getFullYear(), actual_date.getMonth()+1, actual_date.getDate());
    var actual_time = actual_date.getHours();
    const { date_booking, start_booking, cancha } = req.body;
    const user = req.user.username;
    //js_NAME es una actualización de la fecha del formulario, la actualización le permite a Node traa la fecha en formato ISO (YYYY-MM-DD).

    //add 1 day to date_booking
    var date_booking_new = new Date(date_booking);
    js_bookingDate = new Date(date_booking_new.setDate(date_booking_new.getDate()));
    console.log(js_bookingDate);
    var js_Hour = new Date(start_booking);
    var js_bookingHour = js_Hour.getHours();

    console.log('Fecha actual:' + actual_date);
    console.log('Fecha de la reserva:' + js_bookingDate);
    //verify if the date is higher than the current date
    if(js_bookingDate <= actual_date){
        res.render('bookings/create', {message: 'La fecha de reservación debe ser mayor o igual a la fecha actual'});
    } else if(js_bookingDate >= max_date){
        res.render('bookings/create', {message: 'Las reservas no pueden realizarse a largo plazo, el máximo es de un mes a futuro.'});
    } else if(js_bookingHour <= actual_time){
        res.render('bookings/create', {message: 'La hora de reservación debe ser mayor o igual a la hora actual'});
    } else {
    const start_splitted = start_booking.split(':');
    const start_hour = start_splitted[0];
    const start_minutes = start_splitted[1];
    //add 1 to the hour to get the end hour
    const end_hour = parseInt(start_hour) + 1;
    //add 30 to the minutes to get the end minutes
    const end_minutes = parseInt(start_minutes) + 30;
    const end_booking = end_hour +':'+ end_minutes;
    //Objeto de la reserva
    const newBooking = {
        //Los nombres de las variables del objeto 'newBooking' deben ser coincidentes con los de la tabla 'booking'.
        user,
        cancha,
        date_booking,
        start_booking,
        end_booking,
    };
    await pool.query('INSERT INTO booking set ?', [newBooking]);

    //Notificación de reserva a la placa arduino.
    const uno = felino.init();
    felino.print(uno, 'booking', user);
    res.redirect('/bookings');
    }

});

router.get('/delete/:id_booking', isLoggedIn , async (req, res) => {
    const id_booking = req.params.id_booking;
    await pool.query('DELETE FROM booking WHERE id_booking = ?', [id_booking]);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/bookings');
});

//ADMIN SIDE ROUTES

router.get('/admin/list', isAdmin , async (req, res) => {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
    res.render('bookings/admin/list', {bookings: bookings});
});

module.exports = router;