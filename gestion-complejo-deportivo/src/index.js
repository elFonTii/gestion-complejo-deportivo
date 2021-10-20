const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { url } = require('inspector');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const mercadopago = require('mercadopago');
const notis = require('./lib/notifications');
const felino = require('./lib/felino_api');
const mydata = require('./lib/mydata_api');
const socketio = require('socket.io');
const { param } = require('./routes');
// initiazing express
const app = express();
require('./lib/passport');
// settings

//Incializamos el puerto en el que la app se va a ejecutar
app.set('port', (process.env.PORT || 90));

//Inicializamos el directorio donde se encuentran las plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
// La carpeta partials contiene codigo html que se va a renderizar en las plantillas y es reutilizable.
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

//Luego de configurar los directorios y la engine de plantillas, le decimos a express que lo utilice para renderizar las plantillas.
app.set('view engine', '.hbs');

// middlewares
app.use(session({
    secret: 'sqlsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
// Le decimos a express que la url de la app no debe de añadir caracteres extraños ni parametros.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// global vars
app.use((req, res, next) => {
   app.locals.success = req.flash('success');
   app.locals.message = req.flash('message');
   app.locals.user = req.user;
    next();
});
// routes
    app.use(require('./routes'));
    app.use(require('./routes/authentication'));
    app.use('/bookings', require('./routes/bookings'));
    app.use('/dashboard', require('./routes/dashboard'));
    app.use('/subscriptions', require('./routes/subscriptions'));
    app.use('/forum', require('./routes/forum'));
    app.use('/users', require('./routes/user'));
    app.use('/admin', require('./routes/admins'));
    app.use('/field', require('./routes/fields'));
    app.use('/checkout', require('./routes/checkout'));
    app.use('/services', require('./routes/services'));
    app.use('/games', require('./routes/games'));
    app.use('/complejo', require('./routes/complejo'));
    app.use('/notification-center', require('./routes/notification-center'));
    //TOOLS
    app.use('/tools', require('./routes/tools'));

//Mercadopago Integration

//Seteamos credenciales
mercadopago.configure({
    access_token: 'APP_USR-4340992889929344-080505-41c84725d553566484820ee3153552d7-195962628'
  });


//Socket.io integration
var players = {},
  unmatched;

// public folder
    //En la carpeta public se encuentran los archivos estaticos (css, js, imgs, etc)
    app.use(express.static(path.join(__dirname, 'public')));
// start server
    const io = socketio(app.listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    }));
    io.on('connection', (socket) => {
        socket.emit('connected',{msg:"hello"})
        joinGame(socket);

            io.emit('player', app.locals.user);
        if (getOpponent(socket)) {
            socket.emit("game.begin", {
              symbol: players[socket.id].symbol,
            });
            getOpponent(socket).emit("game.begin", {
              symbol: players[getOpponent(socket).id].symbol,
            });
          }

          socket.on("make.move", function (data) {
            if (!getOpponent(socket)) {
              return;
            }
            socket.emit("move.made", data);
            getOpponent(socket).emit("move.made", data);
          });

          socket.on("reset.game", function() {
            if (!getOpponent(socket)) {
              return;
            }
            socket.emit("game.reset");
            getOpponent(socket).emit("game.reset");
          })
        
          socket.on("disconnect", function () {
            if (getOpponent(socket)) {
              getOpponent(socket).emit("opponent.left");
            }
          });

          function joinGame(socket) {
            players[socket.id] = {
              opponent: unmatched,
          
              symbol: "X",
              // The socket that is associated with this player
              socket: socket,
            };
            if (unmatched) {
              players[socket.id].symbol = "O";
              players[unmatched].opponent = socket.id;
              unmatched = null;
            } else {
              unmatched = socket.id;
            }
          }

          function getOpponent(socket) {
            if (!players[socket.id].opponent) {
              return;
            }
            return players[players[socket.id].opponent].socket;
          }
    });