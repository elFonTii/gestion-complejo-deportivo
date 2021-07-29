const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const notis = require('../lib/notifications');

const pool = require('../database');

//Create a new route with the name 'dashboard'.
router.get('/', isLoggedIn, async (req, res) => {
    const notification = notis.get(1);
        res.render('dashboard/dashboard', {notification: notis});
})

module.exports = router;

