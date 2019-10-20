const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const userRouter = require('./routes/router');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000 || process.env.PORT;

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
