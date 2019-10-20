const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const userRouter = require('./routes/router');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const app = express();
const PORT = 5000 || process.env.PORT;

// Flash Middleware
app.use(cookieParser('passporttutorial'));
app.use(
    session({
    cookie: { maxAge: 60000 },
    resave: true,
    secret: "passporttutorial",
    saveUninitialized: true,
    })
);
app.use(flash());

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Global res.locals Middleware
app.use((req, res, next) => {
    // Our own flash
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');

    // Passport Flash
    res.locals.passportFailure = req.flash('error');
    res.locals.passportSuccess = req.flash('success');
    
    // Our Logged In User
    res.locals.user = req.user;
 
    next();
});
// MongoDB Connection
mongoose.connect('mongodb://localhost/passportdb', {
    useNewUrlParser: true,
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection Error'));
db.once('open', () => {
    console.log('Connected to Database');
});
// Template Engine Middleware
app.engine('handlebars', exphbs({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

// Router Middleware
app.use(userRouter);

app.listen(PORT, () => { 
    console.log('App Started');
});
