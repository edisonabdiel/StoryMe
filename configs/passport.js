const User = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;



passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

//makes req.user available for every request
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

//LocalStrategy -> Loggin in user via email / password (not sign up)
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, next) => {
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }

    next(null, foundUser);
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost3000/auth/facebook/callback",
  profileFields: [
    'id',
    'displayName',
    'picture.width(200).height(200)',
    'first_name',
    'middle_name',
    'last_name',
    'email',
  ],
},
  function (accessToken, refreshToken, profile, done) {
    // change something
    User.findOne({ email: profile.email }, function (err, user) {
      if (err)
        return done(err);
      if (user)
        return done(null, user);
      else {
        let newUser = new User();
        // newUser.facebook.id = profile.id;
        // newUser.facebook.token = accessToken;
        newUser.userName = profile.name.givenName;
        newUser.email = profile.emails[0].value;

        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        })
        console.log(profile);
      }
    });
  })




