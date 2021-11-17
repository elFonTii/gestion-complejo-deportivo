const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');
const mp = require('mercadopago');
const mercadopago = require('mercadopago');
const log = require('../lib/log');

/* LISTAR CANCHAS */

router.get('/', isAdmin, async (req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    const quantity = cancha.length;
    res.render('fields/list', { cancha, quantity });
});

/* AÑADIR NUEVA CANCHA */
router.get('/add', isAdmin, (req, res) => {
    res.render('fields/add');
});

router.post('/add', isAdmin, async (req, res) => {
    const { tipo_cancha, description, price, players } = req.body;
    /* MERCADO PAGO PREFERENCE */
    var preference_id = null;
    let preference = {
        items: [
            {
                title: tipo_cancha,
                unit_price: parseInt(price),
                description: description,
                quantity: 1,
            }
        ],
        back_urls: {
            success: 'localhost/checkout/success',
            pending: 'localhost/checkout/pending',
            failure: 'localhost/checkout/failure'
        }
    };
    mp.preferences.create(preference).then(async function (response) {
        preference_id = response.response.id;
        const cancha = {
            preference_id,
            tipo_cancha,
            price,
            players,
            description
        };
        await pool.query('INSERT INTO cancha set ?', [cancha]);
        req.flash('success', 'Cancha agregada correctamente');
        res.redirect('/field');
    }).catch(function (error) {
        console.log(error);
    });

});

/* EDITAR CANCHA */
router.get('/edit/:id_cancha', isAdmin, async (req, res) => {
    const id_cancha = req.params.id_cancha;
    const cancha = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [id_cancha]);
    res.render('fields/edit', { cancha });
});

router.post('/edit/:id_cancha', isAdmin, async (req, res) => {
    const id_cancha = req.params.id_cancha;
    const { tipo_cancha, price, players, description } = req.body;

    //Update the preference
    const query = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [id_cancha]);
    const id = query[0].preference_id;

    mercadopago.preferences.create({
        items: [
            {
                title: tipo_cancha,
                unit_price: parseInt(price),
                description: description,
                quantity: 1
            }
        ],
        back_urls: {
            success: 'localhost/checkout/success',
            pending: 'localhost/checkout/pending',
            failure: 'localhost/checkout/failure'
        }
    }).then(function (response) {
        const preference_id = response.body.id;
        const update = {
            preference_id,
            tipo_cancha,
            price,
            players,
            description
        };
        pool.query('UPDATE cancha SET ? WHERE id_cancha = ?', [update, id_cancha]);
        req.flash('success', 'Cancha actualizada correctamente');
        res.redirect('/field');
    }).catch(function (error) {
        console.log(error);
        req.flash('message', 'Error al actualizar la cancha');
        res.redirect('/field');
    });
});


/* ELIMINAR CANCHA */
router.get('/delete/:id_cancha', isAdmin, async (req, res) => {
    const id_cancha = req.params.id_cancha;
    await pool.query('DELETE FROM cancha WHERE id_cancha = ?', [id_cancha]);
    req.flash('success', 'La cancha ha sido eliminada correctamente.');
    res.redirect('/field');
});


module.exports = router;