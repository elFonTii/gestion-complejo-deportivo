const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');
const mercadopago = require('mercadopago');
const { createProduct } = require('../lib/checkout');


router.get('/:id_booking', isLoggedIn, async(req, res) => {
    const { id_booking } = req.params;
    const select = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE id_booking = ?', [id_booking]);
    const user = req.user.username;
    const data = select[0];
    if(user != data.user){
        req.flash('message', 'La reserva que pretendes pagar no te existe o no te pertenece.');
        res.redirect('/');
    } else{

    const product = createProduct(data.tipo_cancha, data.price);
    mercadopago.preferences.create(product)
    .then(function(response){
        res.redirect(response.body.init_point);
    }).catch(function(error){
      console.log(error);
    });
    }
})

module.exports = router;