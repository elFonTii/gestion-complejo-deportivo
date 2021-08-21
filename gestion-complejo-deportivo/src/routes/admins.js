const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');
const mydata = require('../lib/mydata_api');
const { getAverageBookingDay } = require('../lib/mydata_api');
const log = require('../lib/log');

router.get('/', isAdmin , async(req, res) => {
    const admin = await pool.query('SELECT * FROM users WHERE rol = 1');
    res.render('admin/admins', {admin});
})

router.get('/make', isAdmin, (req, res) => {
    res.render('admin/make');
});

router.post('/make', isAdmin, async(req, res) => {
    const { username } = req.body;
    //Make the admin a user and redirect to the admin page
    if(username == req.user.username){
        req.flash('message', 'Mmm, algo me dice que ya eres un administrador...');
        res.redirect('/admin');
    } else{
        //Select user with the username
        const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if(user.length == 1){
            await pool.query('UPDATE users SET rol = 1 WHERE username = ?', [username]);
            req.flash('success', 'Administrador añadido satisfactoriamente.');
            res.redirect('/admin');
        } else{
            req.flash('message', 'El usuario no existe');
            res.redirect('/admin');
        }
    }
});

router.get('/delete', isAdmin, (req, res) => {
    res.render('admin/delete');
});

router.post('/delete', isAdmin, async(req, res) => {
    const { username } = req.body;
    //Make the admin a user and redirect to the admin page
    if(username == req.user.username){
        req.flash('message', 'No puedes auto-eliminarte el rol de Administrador');
        res.redirect('/admin');
    } else{
        //Select user with the username
        const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if(user.length == 1){
            await pool.query('UPDATE users SET rol = 2 WHERE username = ?', [username]);
            req.flash('success', 'Administrador eliminado satisfactoriamente.');
            res.redirect('/admin');
        } else{
            req.flash('message', 'El usuario no existe');
            res.redirect('/admin');
        }
    }
});


router.get('/dashboard', isAdmin, async(req, res) => {
    log.message('Dia: ' + await mydata.getAverageBookingDay());
    log.message('Mes: ' + await mydata.getAverageBookingMonth());
    log.message('Año: ' + await mydata.getAverageBookingYear());
    log.message('Mañana: ' + await mydata.getCountByDate('2021-08-21'));    
    res.send('recibido');
})
module.exports = router;

/*
        avgBookingsMonth: mydata.getAverageBookingMonth(),
        avgBookingsYear: mydata.getAverageBookingYear(),
        avgBookingsDay: mydata.getAverageBookingDay(),
        todayBookings: mydata.getTodayBookings(),
        userCount: mydata.userCount()
*/