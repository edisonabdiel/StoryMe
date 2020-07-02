
const express = require("express");
const router = express.Router();
// Require user model
const User = require("../models/user-model");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
// package to allow <input type="file"> in forms
const multer = require("multer");

// upload profile picture route
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images", // The name of the folder in cloudinary
    allowedFormats: ["jpg", "png"],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    },
});

const uploadCloud = multer({
    storage: storage,
});

router.post(
    "/upload-img",
    uploadCloud.single("user-img"),
    (req, res) => {
        if (!req.file) {
            // res.redirect("personalAccount")
        } else {
            console.log("req.file", req.file);
            const imageURL = req.file.url;
            User.findById(req.user._id).then((user) => {
                user.image = imageURL;
                return user.save()
            }).then(() => {
                // res.redirect("personalAccount");
                res.status(200).json(user);
            })
        }
    });

// router.post("/delete-profile-img", uploadCloud.single("user-img"), (req, res) => {
//     User.findByIdAndUpdate({
//         _id: req.user._id
//     }, {
//         image: `https://api.adorable.io/avatars/59/${req.user.email}`
//     }).then(() => {
//         res.redirect("personalAccount");
//     });
// });

module.exports = router;