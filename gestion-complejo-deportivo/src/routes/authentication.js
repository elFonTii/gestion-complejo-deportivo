const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');

const dbdata = require('../lib/mydata_api');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('auth/signup', {layout: 'auth'})
});


//Redireccionamiento al registrarse
router.post('/signup', passport.authenticate('local.signup', {
    //En el caso de que se registre correctamente, redireccionará al '/profile'.
        successRedirect: '/profile',
    //En el caso de que el registro falle, redireccionará al '/signup'.
        failureRedirect: '/signup',
    //Permitimos el uso de las alertas de connect-flash.
        failureFlash: true
}));

router.get('/signin', isNotLoggedIn , (req, res) => {
    res.render('auth/signin', {layout: 'auth'})
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, async(req, res) => {
    const isProminent = await dbdata.setUserProminent(req.user.username);
    const movements = await pool.query('SELECT * FROM movements WHERE created_by = ?', [req.user.username]);
    const query = await pool.query('SELECT COUNT(*) as COUNT FROM booking WHERE user = ?', [req.user.username]);
    const bookingCount = query[0].COUNT;
    console.log(bookingCount)

    res.render('profile', {isProminent, movements, bookingCount});
});

router.get('/profile/modify', isLoggedIn, (req, res) => {
    res.render('profile/modify');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
    req.flash('success', 'Sesión cerrada correctamente.');
});

//edit user
router.get('/profile/edit', (req, res) =>{
    res.render('users/editUser');
});

router.post('/profile/edit', async (req, res) =>{
    const username = req.user.username;
    const { name, surname, direccion } = req.body;
    const updateUsuario = {
        name,
        surname,
        direccion
    };
    await pool.query('UPDATE users SET ? WHERE username = ?', [updateUsuario, username]);
        req.flash('success', 'Usuario actualizado, se visualizarán cambios en el próximo inicio de sesión.')
        res.redirect('/profile');
});

module.exports = router;