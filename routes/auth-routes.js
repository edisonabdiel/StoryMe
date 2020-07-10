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


// email authorization
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

//POST /api/singup
authRoutes.post('/signup', signUpValidation, (req, res, next) => {
  // get the validation errors 
  const errors = validationResult(req);
  console.log("outPut: errors", errors.array())
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const email = req.body.email;
  console.log("outPut: email", email)
  const password = req.body.password;
  console.log("outPut: password", password)
  const checked = req.body.checked;
  console.log("outPut: checked", checked)

  User.findOne({ email }, (err, foundUser) => {
    // because of signUpValidation middleware
    // if (err) {
    //   res.status(500).json({ message: "Username check went bad." });
    //   return;
    // }

    // if (foundUser) {
    //   res.status(400).json({ message: 'Email taken. Choose another one.' });
    //   return;
    // }

    //Save new user
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email: email,
      password: hashPass
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
      console.log("email", email);
      console.log(process.env.EMAIL_HOST);
      const mailOptions = {
        from: "storymewebapp@gmail.com",
        to: email,
        subject: "Account Verification Token",
        html: `<p>Hi there,<br></br>
          To verify your email, simply click below.</p><br>
          <a href= "${process.env.EMAIL_HOST}confirmation/${token.token}">verify your email</a><br>
          <h4>Enjoy<br>
          The StoryMe Team</h4>`
      };
      // render the res after signup
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log("erro", err);
          res.status(500).json({ message: 'Email could not be sent' })
        };
        // Automatically log in user after sign up
        // .login() here is actually a predefined passport method
        req.login(newUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
          }
          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(newUser);
        });
      });
    });
  });
});

authRoutes.get("/confirmation/:token", (req, res) => {
  console.log(req.params);
  Token.findOne({
    token: req.params.token,
  })
    .then((token) => {
      return User.findOne({
        _id: token._userId
      })
    }).then((user) => {
      console.log("outPut: user backend", user)
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
    });
});

//POST /api/login
authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
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

authRoutes.put("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);


  User.findByIdAndUpdate(req.params.id,
    {
      email: req.body.email,
      image: req.body.imageUrl,
      imageName: req.body.imageName,
      userName: req.body.userName,
      about: req.body.about,
    }).then((user) => {
      console.log("outPut: user", user)
      res.status(200).json(user);
    }).catch((err) => {
      res.status(500).json({ err: err })
    })
})


module.exports = authRoutes;


// passport.authenticate('local', (err, theUser, failureDetails) => {

//   if (!theUser) {
//     // "failureDetails" contains the error messages
//     // from our logic in "LocalStrategy" { message: '...' }.
//     console.log(failureDetails);
//     console.log("something");
//     res.status(401).json(failureDetails);
//     return;
//   }  })(req, res, next);