// routes/auth-routes.js

const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../models/user-model');

//require the token model and random taoken
// Require token model
const Token = require("../models/token-model");
const randomToken = require("random-token");
const nodemailer = require("nodemailer");
// add express-validation
const {
  validationResult
} = require("express-validator");
const signUpValidation = require("../helpers/middlewares").signUpValidation;
const loggedIn = require("../helpers/middlewares").loggedIn;
// const userDefaultImage = require('../client/src/assets/img/placeholder.jpg')



// email authorization
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

//POST /api/singup
authRoutes.post('/signup', signUpValidation, loggedIn, (req, res, next) => {
  // get the validation errors 
  const errors = validationResult(req);
  const newErrorList = errors.array().map((error) => error.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: newErrorList
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const checked = req.body.checked;
  const image = req.body.image
  const bgImage = req.body.bgImage
  const userName = req.body.userName

  User.findOne({ email }, (err, foundUser) => {

    //Save new user
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      userName,
      about: '',
      image,
      bgImage
    });

    return newUser.save().then((user) => {

      // create new token for the user to verify its email 
      const token = new Token({
        _userId: user._id,
        token: randomToken(16)
      });

      return token.save()
    }).then((token) => {
      //Send email verification
      const mailOptions = {
        from: "storymewebapp@gmail.com",
        to: email,
        subject: "Account Verification Token",
        html: `<p>Hi there,<br></br>
          To verify your email, simply click below.</p><br>
          <a href= "${process.env.EMAIL_HOST}email-confirmed/${token.token}">verify your email</a><br>
          <h4>Enjoy<br>
          The StoryMe Team</h4>`
      };
      // render the res after signup
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          res.status(500).json({ message: 'Email could not be sent' })
        };
        // Automatically log in user after sign up
        req.login(newUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }
          // Send the user's information to the frontend
          res.status(200).json(newUser);
        });
      });
    });
  });
});

authRoutes.get("/confirmation/:token", (req, res) => {
  Token.findOne({
    token: req.params.token,
  })
    .then((token) => {
      return User.findOne({
        _id: token._userId
      })
    }).then((user) => {
      user.isVerified = true;
      return user.save();
    })
    .then((user) => {
      req.login(user, (err) => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }
        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(user);
      });
    }).catch((err) => {
      console.log("outPut: err", err)
    })
});

//POST /api/login
authRoutes.post('/login', loggedIn, (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      const errors = [failureDetails.message]

      res.status(401).json({ errors: errors });
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

//React needs this route -> just see if anyone is logged in
authRoutes.get("/checkuser", (req, res, next) => {
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});


// authRoutes.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


// authRoutes.get('/auth/facebook/callback/', (req, res, next) => {
//   passport.authenticate('facebook', (err, theUser, failureDetails) => {
//     if (!theUser) {
//       // "failureDetails" contains the error messages
//       console.log("outPut: failureDetails", failureDetails.message)
//       const errors = [failureDetails.message]
//       console.log("outPut: errors", errors)

//       res.status(401).json({ errors: errors });
//       return;
//     }
//     // save user in session
//     req.login(theUser, (err) => {
//       // We are now logged in (that's why we can also send req.user)
//       res.status(200).json(theUser);
//     });
//   })(req, res, next)
// });

authRoutes.get('/auth/facebook', (req, res, next) => {
  User.findOne({ token: req.body.response.token, email: req.body.response.email }).then((user) => {
    if (err)
      return res.json(err);
    if (user)
      req.login(user, (err) => {
        // We are now logged in (that's why we can also send req.user)
        res.status(200).json(user);
      });
    else {
      let newUser = new User();
      newUser.image = req.body.response.picture
      newUser.userName = req.body.response.givenName;
      newUser.email = req.body.response.email;
      newUser.token = req.body.response.accessToken
      newUser.facebookId = req.body.response.id
      return newUser.save()
    }
  }).then((user) => {
    req.login(user, (err) => {
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(user);
    });
  })
});


module.exports = authRoutes;


