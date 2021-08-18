const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn ,(req, res) => {
    res.render('main/index');
});

module.exports = router;