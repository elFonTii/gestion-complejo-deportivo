
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    var validPassword = false;
    if(password === user.password){ validPassword = true}
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido a la plataforma ' + user.name));
    } else {
      done(null, false, req.flash('message', 'Ups... Parece que la contraseña es incorrecta.'));
    }
  } else {
    return done(null, false, req.flash('message', 'Ooh... Parece que el usuario que has introducido no existe, intenta nuevamente.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { name, surname } = req.body;
  const rol = 2;
  let newUser = {
    name,
    surname,
    username,
    password,
    rol
  };
  newUser.password = await password;
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});