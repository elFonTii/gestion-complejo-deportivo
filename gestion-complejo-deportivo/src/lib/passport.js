const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');
const notis = require('./notifications');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const profile_img = pool.query('SELECT src FROM profile_img INNER JOIN users ON profile_img.id_img = users.profile WHERE username = ?', [user.username]);
    const validPassword = await helpers.matchPassword(password, user.password);
    
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
  const { name, surname, localidad, direccion, nacimiento, gen } = req.body;
  
  //Verify if the user already exists
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    return done(null, false, req.flash('message', 'El usuario ' + username + ' ya existe, por favor, elige otro.'));
  } else {
    if(gen == 1)
      profile = 'profile_picture_2.svg';
    else
      profile = 'profile_picture_girl';
      
  let newUser = {
    name,
    surname,
    username,
    nacimiento,
    direccion,
    localidad,
    profile,
    password,
    gen,
    rol: 2
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});