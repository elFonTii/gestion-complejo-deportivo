const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');
const log = require('../lib/log');
const dbdata = require('../lib/mydata_api');
const mydata = require('../lib/mydata_api');
const { constructor } = require('../lib/stats');
const sheets = require('../lib/sheets');
const path = require('path');

//Create a new route with the name 'dashboard'.
router.get('/', isLoggedIn, async (req, res) => {
    const todayBookings = await dbdata.getTodayBookings(5);
    const today = new Date();
    // get the current hour and minutes of the day
    const currentTime = today.getHours() + ':' + today.getMinutes() + 30;
    const endHour = today.getHours() + 1 + ':' + today.getMinutes() + 30;
    if (todayBookings != null) {
        //for each booking, check if the booking is active
        for (let i = 0; i < todayBookings.length; i++) {
            const booking = todayBookings[i];
            const startTime = booking.start_booking.split(':');
            const endTime = booking.end_booking.split(':');
            const startHour = startTime[0] + ':' + startTime[1];
            const endHour = endTime[0] + ':' + endTime[1];
            if (startHour <= currentTime && endHour >= currentTime) {
                // if the booking is active, add it to the array
                todayBookings[i].isActive = true;
            } else {
                // if the booking is not active, remove it from the array
                todayBookings[i].isActive = false;
            }
        }
        const prominentUser = await dbdata.getAllProminentUsers();
        const metadata = {
            bookingsCount: await mydata.getBookingCountByUser(req.user.username),
            subscriptionsCount: await mydata.getSubscriptionCountByUser(req.user.username),
            total_users: await constructor('Total de usuarios', await mydata.userCount(), 'Usuarios'),
            total_bookings: await constructor('Total de reservas', await mydata.getTodayBookingsCount(), 'Reservas'),
            today_gains : await constructor('Ganancia diaria', await mydata.administration.gainsPerDay(), 'UYU'),
        }

        res.render('dashboard/dashboard', { todayBookings, prominentUser, metadata });
    } else {
        const prominentUser = await dbdata.getAllProminentUsers();
        console.log('No bookings to update');
        res.render('dashboard/dashboard', { todayBookings, prominentUser });
    }
});

router.get('/:date', isLoggedIn, async (req, res) => {
    const params = req.params.date;
    const data = req.query.date;

    if(params == "date"){
        //Get all the bookings for the selected date
        const todayBookings = await pool.query('SELECT * FROM booking WHERE date_booking = ?', [data]);
    res.render('dashboard/dashboard', { todayBookings });
    } else {
        req.flash('message', 'La fecha solicitada no es correcta');
        res.redirect('/dashboard');
    }
});


module.exports = router;