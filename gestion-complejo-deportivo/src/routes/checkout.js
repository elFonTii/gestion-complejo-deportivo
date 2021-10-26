const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');
const mercadopago = require('mercadopago');
const { createProduct } = require('../lib/checkout');
const log = require('../lib/log');

/*
router.get('/:id_booking', isLoggedIn, async (req, res) => {
    const { id_booking } = req.params;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?', [id_booking]);
    const user = req.user.username;
    const data = select[0];
    if (user != data.user) {
        req.flash('message', 'La reserva que pretendes pagar no te existe o no te pertenece.');
        res.redirect('/bookings');
    } else {
        const product = createProduct(data.tipo_cancha, data.price);
        mercadopago.preferences.create(product)
            .then(function (response) {
                res.redirect(response.body.init_point);
                global.id = response.body.id;
            }).catch(function (error) {
                console.log(error);
            });
    }
})
*/

router.get('/verification/:id_booking/', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?', [req.params.id_booking]);
        const booking = select[0];
        const user = req.user.username;
        res.render('checkout/verification', {booking});
});

router.post('/verification/:id_booking', isLoggedIn, async (req, res) => {
    const { payment_id } = req.body;
    const id_booking = req.params.id_booking;

    if(id_booking != null) {
        if (payment_id != null) {
            mercadopago.payment.get(payment_id).then(async function (payment) {
                if (payment.status == 'approved') {
                   await pool.query('UPDATE booking SET paymentStatus = ? payment_id = ? WHERE id_booking = ?', ['Pagado', payment_id, id_booking]);
                    req.flash('message', 'El pago fue aprovado satisfactoriamente.');
                    res.redirect('/bookings');
                } else if (payment.status == 'pending') {
                    await pool.query('UPDATE booking SET paymentStatus = ? payment_id = ? WHERE id_booking = ?', ['Pendiente', payment_id, id_booking]);
                    req.flash('message', 'El pago está pendiente de aprobación.');
                    res.redirect('/bookings');
                } else {
                   await pool.query('UPDATE booking SET paymentStatus = ? WHERE id_booking = ?', ['Rechazado', id_booking]);
                    req.flash('message', 'El pago fue rechazado.');
                    res.redirect('/bookings');
                }
            });
        } else {
            req.flash('message', 'No se ha recibido el pago.');
            res.redirect('/bookings');
        }
    } else {
        req.flash('message', 'No se ha recibido una reserva.');
        res.redirect('/bookings');
    }
});

module.exports = router;