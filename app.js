
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
// const cors = require("cors");

require('dotenv').config();

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcryptjs, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/client/build')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// ADD SESSION SETTINGS HERE:
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: "abc", // but it's required
  resave: false,
  saveUninitialized: false, // don't create cookie for non-logged-in user
  // MongoStore makes sure the user stays logged in also when the server restarts
  cookie: {
    maxAge: 6 * 60 * 60 * 1000,
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - StoryMe Database';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

// allow access to the API from different domains/origins
// app.use(cors({
// this could be multiple domains/origins, but we will allow just our React app
//   origin: ["http://localhost:3000"]
// }));

// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);

app.use('/api', require('./routes/story-routes'));
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/upload-img-routes'));
app.use('/api', require('./routes/user-routes'));

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

// app.get('/profile-page/:id', (req, res, next) => {
//   console.log('profile route', req.params)
//   res.json("I'm the unknown error")
// });

module.exports = app;
