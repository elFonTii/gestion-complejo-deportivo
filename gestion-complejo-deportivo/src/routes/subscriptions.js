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

router.get('/delete/owner=:owner&subscription=:subscription', isLoggedIn, async(req, res) => {
    const owner = req.params.owner;
    const subscription = req.params.subscription;

    //Verify if the user is the owner of the subscription
    if(owner !== req.user.username){
        req.flash('message', 'Permisos insuficientes');
        res.redirect('/subscriptions');
    }else{
        await pool.query('DELETE FROM suscripcion WHERE owner = ? AND subscription = ?', [owner, subscription]);
        req.flash('success', 'Suscripción eliminada correctamente');
        res.redirect('/subscriptions');
    }
});

module.exports = router;