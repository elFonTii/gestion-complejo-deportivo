const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn , async (req, res) => {
    const query = await pool.query('SELECT * FROM complejo');
    const complejo = query[0];

    //Render the comlpex view with
    res.render('main/index', { layout: 'index.hbs', complejo });
});

module.exports = router;