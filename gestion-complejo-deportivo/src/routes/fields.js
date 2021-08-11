const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');

/* LISTAR CANCHAS */

router.get('/', isAdmin, async(req, res) => {
    const cancha = await pool.query('SELECT * FROM cancha');
    const quantity = cancha.length;
    res.render('fields/list', {cancha, quantity});
});

/* AÑADIR NUEVA CANCHA */
router.get('/add', isAdmin, (req, res) => {
    res.render('fields/add');
});

router.post('/add', isAdmin, async(req, res) => {
    const { tipo_cancha, description, price, players } = req.body;
    const cancha = {
        tipo_cancha,
        price,
        players,
        description
    };
    console.log(cancha);
    await pool.query('INSERT INTO cancha set ?', [cancha]);
    req.flash('success', 'Cancha agregada correctamente');
    res.redirect('/field');

});

/* EDITAR CANCHA */

router.get('/edit/:id_cancha', isAdmin, async(req, res) => {
    const id_cancha = req.params.id_cancha;
    const cancha = await pool.query('SELECT * FROM cancha WHERE id_cancha = ?', [id_cancha]);
    res.render('fields/edit', {cancha});
});

router.post('/edit/:id_cancha', isAdmin, async(req, res) => {
    const id_cancha = req.params.id_cancha;
    const {tipo_cancha, price, players, description} = req.body;
    //update the cancha with the new values
    await pool.query('UPDATE cancha SET tipo_cancha = ?, price = ?, players = ?, description = ? WHERE id_cancha = ?', [tipo_cancha, price, players, description, id_cancha]);

    req.flash('success', 'La cancha ha sido actualizada correctamente.');
    res.redirect('/field');
});


/* ELIMINAR CANCHA */
router.get('/delete/:id_cancha', isAdmin, async(req, res) => {
    const id_cancha = req.params.id_cancha;
    await pool.query('DELETE FROM cancha WHERE id_cancha = ?', [id_cancha]);
    req.flash('success', 'La cancha ha sido eliminada correctamente.');
    res.redirect('/field');
});


module.exports = router;