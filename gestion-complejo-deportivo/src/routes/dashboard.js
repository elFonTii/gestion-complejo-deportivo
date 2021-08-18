const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const notis = require('../lib/notifications');
const { charts } = require('../lib/chart');
const pool = require('../database');
const dbdata = require('../lib/mydata_api');

//Create a new route with the name 'dashboard'.
router.get('/', isLoggedIn, async (req, res) => {
    const currentBooking = await dbdata.getActiveBooking();
        res.render('dashboard/dashboard', {currentBooking});
})


module.exports = router;