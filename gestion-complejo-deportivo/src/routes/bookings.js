const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

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
    console.log(data);
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
    js_bookingDate = new Date(date_booking);
    var js_Hour = new Date(start_booking);
    var js_bookingHour = js_Hour.getHours();
    //verify if the date is higher than the current date
    if(js_bookingDate < actual_date){
        res.render('bookings/create', {message: 'La fecha de reservación debe ser mayor o igual a la fecha actual'});
    } else if(js_bookingDate > max_date){
        res.render('bookings/create', {message: 'Las reservas no pueden realizarse a largo plazo, el máximo es de un mes a futuro.'});
    } else if(js_bookingHour < actual_time){
        res.render('bookings/create', {message: 'La hora de reservación debe ser mayor o igual a la hora actual'});
    } else {

    const start_splitted = start_booking.split(':');
    const start_hour = start_splitted[0];
    //add 1 to the hour to get the end hour
    const end_hour = parseInt(start_hour) + 1;
    const end_booking = end_hour +':'+ start_splitted[1];
    console.log(end_booking);
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
    notis.windows('Nueva reserva ingresada', '¡Atención! Una nueva reserva a ingresado a la plataforma.');
    res.redirect('/bookings');
    }
});

router.get('/delete/:id_booking', isLoggedIn , async (req, res) => {
    const id_booking = req.params.id_booking;
    await pool.query('DELETE FROM booking WHERE id_booking = ?', [id_booking]);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/bookings');
});


module.exports = router;