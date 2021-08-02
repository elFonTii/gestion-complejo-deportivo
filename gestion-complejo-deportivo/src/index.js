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
const forumRouter = require('./routes/forum');

// initiazing express
const app = express();
require('./lib/passport');

// settings

//Incializamos el puerto en el que la app se va a ejecutar
app.set('port', (process.env.PORT || 10));

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
    app.use('/forum', forumRouter);

// public folder
    //En la carpeta public se encuentran los archivos estaticos (css, js, imgs, etc)
    app.use(express.static(path.join(__dirname, 'public')));
// start server
    app.listen(app.get('port')), () => {
        console.log('Server inicializado con éxito.');
    }