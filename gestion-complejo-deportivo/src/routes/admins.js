const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');

router.get('/', isAdmin , async(req, res) => {
    const admin = await pool.query('SELECT * FROM users WHERE rol = 1');
    res.render('admin/admins', {admin});
})

router.post('/insert', isAdmin ,passport.authenticate('local.signup', {
    //En el caso de que se registre correctamente, redireccionará al '/profile'.
        successRedirect: '/admins',
    //En el caso de que el registro falle, redireccionará al '/signup'.
        failureRedirect: '/admins',
    //Permitimos el uso de las alertas de connect-flash.
        failureFlash: true
}));

module.exports = router;