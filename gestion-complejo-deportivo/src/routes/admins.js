const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');
const mydata = require('../lib/mydata_api');
const { getAverageBookingDay, userCount, getTodayBookings } = require('../lib/mydata_api');
const log = require('../lib/log');
const { constructor } = require('../lib/stats');

router.get('/', isAdmin , async(req, res) => {
    res.status(404).send('Error 404: Not found');
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
    const estadisticas = {
        total_users: await constructor('Total de usuarios', await mydata.userCount(), 'Usuarios'),
        total_bookings: await constructor('Total de reservas', await mydata.getTodayBookingsCount(), 'Reservas'),
        today_gains : await constructor('Ganancia diaria', await mydata.administration.gainsPerDay(), 'UYU'),
    }

    res.render('admin/dashboard', {stats: estadisticas})
});

module.exports = router;

/*
        avgBookingsMonth: mydata.getAverageBookingMonth(),
        avgBookingsYear: mydata.getAverageBookingYear(),
        avgBookingsDay: mydata.getAverageBookingDay(),
        todayBookings: mydata.getTodayBookings(),
        userCount: mydata.userCount()


        userCount: await mydata.userCount(),
        todayBookingCount: await mydata.getTodayBookingsCount(),
        todayGains: await mydata.administration.gainsPerDay(),
        usersRegistered: await mydata.administration.userRegisteredTodayCount(),
*/