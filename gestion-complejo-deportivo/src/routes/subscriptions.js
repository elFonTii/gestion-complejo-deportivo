const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth');
const pool = require('../database');

/* USER SUBSCRIPTION LIST */
router.get('/' , isLoggedIn , async(req, res) => {
    const user = req.user;
    const subscriptions = await pool.query('SELECT * FROM suscripcion INNER JOIN service ON suscripcion.subscription = service.service_id WHERE owner = ?', user.username);
    res.render('subs/user/user_subs.hbs', {subscriptions} );
}); 
module.exports = router;