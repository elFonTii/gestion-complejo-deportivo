const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn , async (req, res) => {
    const complejo = await pool.query('SELECT * FROM complejo')
    res.render('main/index', { layout: 'index.hbs', complejo });
});

module.exports = router;