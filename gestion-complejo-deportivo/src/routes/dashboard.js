const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const notis = require('../lib/notifications');

const pool = require('../database');

//Create a new route with the name 'dashboard'.
router.get('/', isLoggedIn, async (req, res) => {
    res.render('dashboard/dashboard');
})
router.post('/', isLoggedIn, async (req, res) => {
    const noti = {
        title: notifications[0].title,
        content: notifications[0].content,
        icon: notifications[0].icon
    }
    console.log(noti);
    res.render('dashboard/dashboard', {noti});
})

module.exports = router;

