const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn} = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('auth/signup')
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

router.get('/signin', (req, res) => {
    res.render('auth/signin')
});

router.post('/signin', async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true   
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
    req.flash('success', 'Sesión cerrada correctamente.');
});

router.get('/profile/personal', isLoggedIn , (req, res) => {
    res.render('user/personal-info')
});

module.exports = router;