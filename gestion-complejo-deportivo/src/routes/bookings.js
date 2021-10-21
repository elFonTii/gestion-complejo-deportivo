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
const Booking = require('../lib/booking');
const { normalizeDate } = require('../lib/mydata_api');
const mercadopago = require('mercadopago');
const checkout = require('../lib/checkout');
const { check } = require('express-validator');


router.get('/create', isLoggedIn, async (req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    res.render('bookings/create', { cancha: cancha });
});

router.get('/create/new/:id_cancha', isLoggedIn, async (req, res) => {
    const cancha = req.params.id_cancha;
    const data = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [cancha]);
    res.render('bookings/new', { cancha: cancha, data: data });
})

router.get('/create/new/', isLoggedIn, async (req, res) => {
    req.flash('message', 'No has seleccionado una cancha');
    res.redirect('/bookings/create');
});

router.get('/', isLoggedIn, async (req, res) => {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE user = ?', [req.user.username]);
    res.render('bookings/list', { bookings: bookings });
});

router.post('/create/new', isLoggedIn, async (req, res) => {
    //Request the data from the form and the global variables.
    const { date_booking, start_booking, cancha } = req.body;
    const user = req.user.username;
    const _booking = new Booking(date_booking, start_booking + ':00', cancha, user);
    const bookings = await pool.query('SELECT * FROM booking WHERE date_booking = ? AND start_booking = ? AND cancha = ?', [_booking.date_booking, _booking.start_booking, _booking.cancha]);
    const isBusy = await _booking.isBusy();
    if (_booking.isInDate()) {
        if (isBusy) {
            req.flash('message', 'La cancha seleccionada está ocupada en la fecha y hora seleccionada.');
            res.redirect('/bookings/create');
        } else {
            await _booking.insert();
            req.flash('message', 'Reserva creada correctamente');
            res.redirect('/bookings');
        }
    } else {
        req.flash('message', 'La fecha seleccionada no es válida');
        res.redirect('/bookings/create');
    }
});


router.get('/delete/:id_booking', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    await pool.query('DELETE FROM booking WHERE id_booking = ?', [id_booking]);
    req.flash('success', 'Reserva eliminada correctamente');
    res.redirect('/bookings');
});



//ADMIN SIDE ROUTES
router.get('/admin/list', isAdmin, async (req, res) => {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
    res.render('bookings/admin/list', { bookings: bookings });
});

router.get('/inspect/:id_booking', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?;', [id_booking]);
    const booking = select[0];

    if (booking.user != req.user.username) {
        req.flash('message', 'No tienes permisos para realizar esta acción');
        res.redirect('/dashboard');
    } else {
        
        let preference = {
            items: [
              {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
              }
            ]
          };
          
          mercadopago.preferences.create(preference)
          .then(function(response){
          // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            global.id = response.body.id;
            console.log('Para pagar, haga click en el botón de abajo');
            res.render('bookings/inspect', { booking: booking });
          }).catch(function(error){
            console.log(error);
          });
    }

})

module.exports = router;