const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
   const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    //Si se encuentra un usuario con ese username:
        if(rows.length > 0) {
            const user = rows[0];
            console.log(user);
            const validPassword = await helpers.matchPassword(password, user.password);
    
    //Si la contraseña es correcta:
          if(validPassword) {
            done(null, user, req.flash('success','Bienvenido a la plataforma' + ' ' + user.name));
    //Si no:
          } else{
            done(null, false, req.flash('message','Contraseña incorrecta, intenta nuevamente.'));
          }
        } 
    //Si el usuario no existe:
        else {
            return done(null, false, req.flash('message','El usuario no existe.'));
        }

}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rol = 1;
    const newUser = {
        username,
        password,
        name : req.body.name,
        surname : req.body.surname,
        rol
    };
    newUser.password = await helpers.encryptPassword(password); 
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    console.log(result);
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {  
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    done(null, user[0]);
});
