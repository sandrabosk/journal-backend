const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const cors         = require('cors');
var session        = require('express-session');
var passport       = require('passport');

require('dotenv').config();
// cloudinary set up
require("./config/cloudinary");
// passport set up
require('./config/passport-config');

mongoose.connect('mongodb://localhost/journal-development');

const app = express();

// app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

// add session stuff
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));
// add passport stuff
app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    credentials: true,                 // allow other domains to send cookies
    origin: ["http://localhost:4200"]  // these are the domains that are allowed
  })
);



const index = require('./routes/index');
app.use('/', index);

const apiRoutes = require('./routes/api/journal-entries');
app.use('/api', apiRoutes);

const authRoutes = require('./routes/user/auth-routes');
app.use('/api', authRoutes);

app.use((req, res, next) => {
  // If no routes match, send them the Angular HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
