const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');
const passport = require('passport');
const dbdata = require('../lib/mydata_api');

router.get('/', isAdmin ,async (req, res) => {
  //Obtenemos los usuarios desde la base de datos.
    const users = await pool.query('SELECT * FROM users');
  res.render('users/list', {users: users});
});

router.get('/inspect/:username', isAdmin, async (req, res) => {
  //Obtenemos los usuarios desde la base de datos.
    const row = await pool.query('SELECT * FROM users WHERE username = ?', [req.params.username]);
    const subject = row[0];
    
    if(subject.username == req.user.username) {
      req.flash('success', '¿No crees que es mejor idea inspeccionar a alguien más?');
        res.redirect('/users');
    } else {
      const subject_data = {
        bookings: await dbdata.getBookingCountByUser(req.params.username),
      }
      
      const isProminent = await dbdata.setUserProminent(subject.username);
      res.render('users/inspect', {subject, isProminent, subject_data}); 
    }
});

router.get('/insert/', isAdmin, async (req, res) => {
  res.render('users/insert');
});

router.post('/insert', passport.authenticate('local.signup', {
  //En el caso de que se registre correctamente, redireccionará al '/profile'.
      successRedirect: '/profile',
  //En el caso de que el registro falle, redireccionará al '/signup'.
      failureRedirect: '/signup',
  //Permitimos el uso de las alertas de connect-flash.
      failureFlash: true
}));

//delete user
router.get('/delete/:username', isAdmin, async (req, res) => {
  //Obtenemos los usuarios desde la base de datos.
    const row = await pool.query('SELECT * FROM users WHERE username = ?', [req.params.username]);
    const subject = row[0];
    if(subject.username == req.user.username) {
      req.flash('success', '¿No crees que es mejor idea eliminar a alguien más?');
        res.redirect('/users');
    } else {
      await pool.query('DELETE FROM users WHERE username = ?', [req.params.username]); 
      req.flash('success', '¡Usuario eliminado!');
        res.redirect('/users');
    }
});

module.exports = router;