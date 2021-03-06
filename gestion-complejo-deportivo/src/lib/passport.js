const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
const notis = require('./notifications');

//========================================================= PASSPORT LOCAL LOGIN =========================================================
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

// ========================================================= PASSPORT LOCAL REGISTRATION =========================================================
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { email, name, surname, localidad, direccion, nacimiento, gen } = req.body;

  //Verify if the user already exists
  const users = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
  if (users.length > 0) {
    return done(null, false, req.flash('message', 'Ya existe un usuario con ese usuario o correo.'));
  } else {
    //Verify if the username have invalid characters.
    const acceptedCharacter = /^[a-zA-Z0-9]+$/;
    if (!acceptedCharacter.test(username)) {
      return done(null, false, req.flash('message', 'El nombre de usuario no puede contener caracteres especiales.'));
    } else {

      if (gen == 1)
        profile = 'profile_picture_2.svg';
      else
        profile = 'profile_picture_girl';

      let newUser = {
        email,
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
  }
}));

// Serialize the user to the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});