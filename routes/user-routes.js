// routes/user.js

const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../models/user-model');



router.put("/user/:id", (req, res, next) => {
    console.log(req.params.id);
    console.log('req.body update user', req.body);

    User.findByIdAndUpdate(req.params.id,
        {
            email: req.body.email,
            image: req.body.imageUrl,
            imageName: req.body.imageName,
            bgImageName: req.body.bgImageName,
            bgImage: req.body.bgImageUrl,
            userName: req.body.userName,
            about: req.body.about,
        }, {
        new: true
    }).then((user) => {
        console.log("outPut: user", user)
        res.status(200).json(user);
    }).catch((err) => {
        res.status(500).json({ err: err })
    })
})

router.put("/password/:id", (req, res, next) => {
    console.log("Params", req.params.id);
    console.log("req.body", req.body);
    console.log("outPut: req.user.password", req.user.password)

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.newPassword, salt)
    User.findOne({ _id: req.params.id }).then((user) => {
        console.log("outPut: user.password", user.password)

        if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
            res.json({ errors: ['Incorrect password.'] })
            return;
        } else {
            console.log("user", user.password);
            user.password = hashPass
        }
        return user.save().then((user) => {

            // res.status(200).json(user);
            res.status(200).json({ message: ['Password has been updated'] });
        })
    }).catch((err) => {
        console.log(err);
        res.json({ errors: ['Something went wrong, please try again'] })
    })

})

router.get('/profile-page/:id', (req, res, next) => {
    console.log(req.params.id);
    Promise.all([
        User.findById(
            req.params.id
        ).populate("followers"),
        User.find({
            followers: req.params.id
        })]).then((resp) => {
            console.log("outPut: resp profile page follow and followers", resp)
            const user = resp[0]
            const following = resp[1]
            res.json({ user: user, following: following });
        }).catch((err) => {
            console.log(err);
        })

});


router.put('/user/:id/follow', (req, res, next) => {
    console.log(req.body)
    if (req.user.id != req.params.id) {
        User.findById(req.params.id).then((user) => {
            console.log("user", user)
            let promise;
            if (user.followers.includes(req.user._id)) {
                promise = User.findByIdAndUpdate(req.params.id, {
                    $pull: { followers: req.user._id }
                }, { new: true })
            } else {
                promise = User.findByIdAndUpdate(req.params.id, {
                    $push: { followers: req.user._id }
                }, { new: true })
            }
            promise.populate("followers")
                .then((resp) => {
                    console.log("outPut: resp", resp)
                    res.json(resp);
                })
        }).catch((err) => {
            console.log("add follower error", err);
        })
    }

})


module.exports = router;
