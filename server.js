// server.js

// Get what we need.
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const mysql = require('mysql');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const busboy = require('busboy');

const app = express();
const port = process.env.PORT || 5000;

// Database connection.
require('./config/passport')(passport);

// App settings.
app.use(morgan('dev')); // Logging.
app.use(cookieParser('goodnight'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'goodnight',
  resave: true,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes.
require('./routes')(app, passport, busboy);

// Search.
require('./search');

// Launch.
app.listen(port, () => console.log(`Listening on port ${port}`));
