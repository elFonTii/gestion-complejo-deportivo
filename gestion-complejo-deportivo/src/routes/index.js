const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/auth');

<<<<<<< Updated upstream
router.get('/', isNotLoggedIn ,(req, res) => {
    res.render('main/index');
=======
router.get('/', isNotLoggedIn , async (req, res) => {
    const complejo = await pool.query('SELECT * FROM complejo')
    res.render('main/index', { complejo });
>>>>>>> Stashed changes
});

module.exports = router;