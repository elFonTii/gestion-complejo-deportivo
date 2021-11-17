const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');
const mercadopago = require('mercadopago');
const { createProduct } = require('../lib/checkout');
const log = require('../lib/log');
const { payment } = require('mercadopago');

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

router.get('/:status', isLoggedIn, (req, res) => {
    const { status } = req.params;
    const data = req.query;
    if(data.collection_id) {
        if (status == 'success') {
            //Set the booking as paid
            req.flash('success', 'Pago realizado con éxito, debes verificar el pago.');
            res.redirect('/bookings');
        } else if (status == 'pending') {
            req.flash('neutral', 'Pago pendiente, espera un tiempo y verifica el pago.');
            res.redirect('/bookings');
        } else if (status == 'failure' && data != null) {
            req.flash('message', 'Algo ha salido mal durante el pago.');
            res.redirect('/bookings');
        } else {
            req.flash('message', 'Algo ha salido mal, intenta nuevamente.');
            res.redirect('/bookings');
        }
    } else {
        req.flash('message', 'Algo ha salido mal, intenta nuevamente.');
        res.redirect('/bookings');
    }
});

router.get('/verification/:id_booking/', isLoggedIn, async (req, res) => {
    const id_booking = req.params.id_booking;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?', [req.params.id_booking]);
    const booking = select[0];
    const user = req.user.username;
    res.render('checkout/verification', { booking });
});

router.post('/verification/:id_booking', isLoggedIn, async (req, res) => {
    const { payment_id } = req.body;
    const id_booking = req.params.id_booking;

    //Payment_id only will have numbers.
    if (payment_id.match(/^[0-9]+$/)) {
        mercadopago.payment.get(payment_id).then(async function (payment) {
            const existingPayment = await pool.query('SELECT * FROM movements WHERE payment_id = ?', [payment_id]);
            if (existingPayment.length > 0) {
                req.flash('neutral', 'Ya existe un pago con este número de referencia');
                res.redirect('/bookings');
            } else {
                const booking_data = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?', [id_booking]);
                if (payment.body.status == 'approved') {
                    const update = await pool.query('UPDATE booking SET paymentStatus = ?, payment_id = ? WHERE id_booking = ?', ['Pagado', payment_id, id_booking]);
                    //Add this to the movements table
                    const insert = await pool.query('INSERT INTO movements (created_by, movement, payment_id, type, amount, description, message) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.user.username, id_booking, payment_id, 'Pago', payment.body.transaction_amount, 'Pago de reserva', 'Pagaste una reserva de la cancha ' + booking_data[0].tipo_cancha + ' por un monto de $' + payment.body.transaction_amount]);
                    req.flash('success', 'Pago realizado con éxito');
                    res.redirect('/bookings');
                } else if (payment.body.status == 'pending') {
                    const update = await pool.query('UPDATE booking SET paymentStatus = ?, payment_id = ? WHERE id_booking = ?', ['Pendiente', payment_id, id_booking]);
                    req.flash('neutral', 'Pago pendiente de aprobación');
                    res.redirect('/bookings');
                } else {
                    req.flash('error', 'Pago rechazado');
                    res.redirect('/bookings');
                }
            }
        }).catch(function (error) {
            req.flash('message', 'Hubo un error en la verificación');
            res.redirect('/bookings');
            console.log(error);
        });

    } else {
        req.flash('message', 'La referencia del pago no puede contener letras');
        res.redirect('/bookings');
    }
});

module.exports = router;

/*
if(payment.body.status == 'approved') {
                const update = await pool.query('UPDATE booking SET paymentStatus = ?, payment_id = ? WHERE id_booking = ?', ['Pagado', payment_id, id_booking]);
                req.flash('success', 'Pago realizado con éxito');
                res.redirect('/bookings');
            } else if(payment.body.status == 'pending') {
                const update = await pool.query('UPDATE booking SET paymentStatus = ?, payment_id = ? WHERE id_booking = ?', ['Pendiente', payment_id, id_booking]);
                req.flash('neutral', 'Pago pendiente de aprobación');
                res.redirect('/bookings');
            } else{
                req.flash('error', 'Pago rechazado');
                res.redirect('/bookings');
            }
*/