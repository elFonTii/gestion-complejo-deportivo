const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth');
const felino = require('../lib/felino_api');
const dbdata = require('../lib/mydata_api');
const log = require('../lib/log');
const notis = require('../lib/notifications');
//Referencia a la conexión a la base de datos
const pool = require('../database');
const mydata = require('../lib/mydata_api');


router.get('/create', isLoggedIn , async (req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    res.render('bookings/create', {cancha: cancha});
});

router.get('/create/new/:id_cancha', isLoggedIn, async (req, res) => {
    const cancha = req.params.id_cancha;
    const data = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [cancha]);
    res.render('bookings/new', {cancha: cancha, data: data});
})

router.get('/create/new/', isLoggedIn, async (req, res) => {
    req.flash('message', 'No has seleccionado una cancha');
    res.redirect('/bookings/create');
});

router.get('/', isLoggedIn , async (req, res) => {
   const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE user = ?',[req.user.username]);
    res.render('bookings/list', {bookings: bookings});
    console.log(bookings);
});

router.post('/create/new', isLoggedIn , async (req, res) => {
    //Request the data from the form and the global variables.
    const { date_booking, start_booking, cancha } = req.body;
    const user = req.user.username;
    //Objeto de la reserva
    const newBooking = {
        //Los nombres de las variables del objeto 'newBooking' deben ser coincidentes con los de la tabla 'booking'.
        user,
        cancha,
        date_booking,
        start_booking,
        end_booking: null
    };
    //Set the end time of the booking
    dbdata.setEndTime(newBooking);
    
    if(dbdata.isFuture(newBooking)){
        if(dbdata.isFutureTime(newBooking)){
            if(await dbdata.isAvailable(newBooking)){
                //Insert the booking in the database
                await pool.query('INSERT INTO booking set ?', [newBooking]);
                //Redirect to the list of bookings
                req.flash('success', 'La reserva fue ingresada correctamente');
                res.redirect('/bookings');
            }else{
                req.flash('message', 'La cancha no está disponible en ese horario');
                res.redirect('/bookings/create');
            }
        } else {
            req.flash('message', 'El horario de la reserva no es válido');
            res.redirect('/bookings/create');
        }
    } else {
        req.flash('message', 'La reserva no puede ser en el pasado');
        res.redirect('/bookings/create');
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