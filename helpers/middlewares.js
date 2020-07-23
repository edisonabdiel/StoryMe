const {
    check
} = require("express-validator");
const User = require("../models/user-model");


let signUpValidation = [
    check("email")
        .isEmail().withMessage("Email is not valid")
        .custom((email) => {
            return User.findOne({
                email: email,
            }).then((user) => {
                if (user) {
                    throw new Error("E-mail already in use");
                }
            });
        }),
    check("password")
        .isLength({
            min: 5,
        })
        .withMessage("Password must be at least 5 chars long"),
    check('userName').not().isEmpty().withMessage("user Name is required"),
    check("checked").equals("true").withMessage("must agree to terms and conditions")
];

let loggedIn = (req, res, next) => {
    if (req.user) {
        res.status(400).json({
            errors: ['It seems that you are already logged in']
        });
    } else {
        next()
    }
};




module.exports = {
    signUpValidation: signUpValidation,
    loggedIn: loggedIn
};