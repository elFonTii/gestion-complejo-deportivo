
/*
<summary>
    This router module is responsible for the bookings management.
    It allows to create, update and delete bookings.
    It also allows to get the bookings of a user.

    For all the routes, the function have to be called with the following parameters:
    - req: the request object
    - res: the response object
</summary>
*/

// Import the necessary modules
const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth');
const felino = require('../lib/felino_api');
const dbdata = require('../lib/mydata_api');
const log = require('../lib/log');
const notis = require('../lib/notifications');
const pool = require('../database');
const mydata = require('../lib/mydata_api');
const Booking = require('../lib/booking');
const { normalizeDate } = require('../lib/mydata_api');
const mercadopago = require('mercadopago');
const checkout = require('../lib/checkout');
const { check } = require('express-validator');


/* RENDER THE CREATE BOOKING PAGE */
router.get('/create', isLoggedIn, async (req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    res.render('bookings/create', { cancha: cancha });
});

/* RENDER THE CREATE BOOKING PAGE WITH THE FIELD SELECTED */
router.get('/create/new/:id_cancha', isLoggedIn, async (req, res) => {
    const cancha = req.params.id_cancha;
    const data = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [cancha]);
    res.render('bookings/new', { cancha: cancha, data: data });
})

/* RENDER THE CREATE BOOKING PAGE WHEN THE FIELD IS NOT SELECTED */
router.get('/create/new/', isLoggedIn, async (req, res) => {
    req.flash('message', 'No has seleccionado una cancha');
    res.redirect('/bookings/create');
});

/* RENDER THE USER BOOKINGS PAGE */
router.get('/', isLoggedIn, async (req, res) => {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE user = ?', [req.user.username]);
    res.render('bookings/list', { bookings: bookings });
});

/* 
<summary>
    This function is used to create a new booking.
    It receives the data from the form and creates a new booking.
    It also creates a new payment in mercadopago.
</summary>
*/
router.post('/create/new', isLoggedIn, async (req, res) => {
    //Request the data from the form and the global variables.
    const { date_booking, start_booking, cancha } = req.body;
    const user = req.user.username;
    const _booking = new Booking(date_booking, start_booking, cancha, user);

    if (await _booking.isBusy()) {
        req.flash('message', 'La cancha seleccionada está ocupada');
        res.redirect('/bookings/create');
    } else {
        await _booking.insert();
        req.flash('message', 'Reserva ingresada correctamente');
        res.redirect('/bookings');
    }
});

/*
<summary>
    This function is used to delete a booking.
    It receives the id of the booking and deletes it.
</summary>
*/
router.get('/delete/:id_booking', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    await pool.query('DELETE FROM booking WHERE id_booking = ?', [id_booking]);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/bookings');
});

// RENDER ALL THE INFORMATION ABOUT A BOOKING, USER, CANCHA AND PAYMENT
router.get('/inspect/:id_booking', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?;', [id_booking]);
    const booking = select[0];

    if (select.length == 0) {
        req.flash('message', 'No existe la reserva');
        res.redirect('/bookings/admin/list');
    } else {

        if (booking.payment_id != null && booking.paymentStatus != null) {
            if (booking.user != req.user.username) {
                req.flash('message', 'No tienes permisos para realizar esta acción');
                res.redirect('/dashboard');
            } else {
                const payment = mercadopago.payment.get(booking.payment_id).then(function (payment) {
                    res.render('bookings/inspect', { booking: booking, payment: payment });
                }).catch(function (error) {
                    console.log(error);
                });
            }
        } else {
            res.render('bookings/inspect', { booking: booking });
        }
    }

});



/* Admin side routes below */

// RENDER THE BOOKINGS LIST PAGE
router.get('/admin/list', isAdmin, async (req, res) => {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
    res.render('bookings/admin/list', { bookings: bookings });
});


//EXPORT THIS MODULE TO BE USED IN THE MAIN APP
module.exports = router;