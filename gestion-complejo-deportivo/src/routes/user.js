const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');

router.get('/', isAdmin ,async (req, res) => {
  //Obtenemos los usuarios desde la base de datos.
    const users = await pool.query('SELECT * FROM users');
  res.render('users/list', {users: users});
});

router.get('/inspect/:username', isAdmin, async (req, res) => {
  //Obtenemos los usuarios desde la base de datos.
    const row = await pool.query('SELECT * FROM users WHERE username = ?', [req.params.username]);
    const subject = row[0];
    res.render('users/inspect', {subject});
});
module.exports = router;