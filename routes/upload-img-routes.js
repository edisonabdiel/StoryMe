
const express = require("express");
const router = express.Router();
// Require user model
const Story = require("../models/story-model");
// package to allow <input type="file"> in forms
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');






// upload profile picture route
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        format: async (req, file) => "png", // supports promises as well
        public_id: (req, file) => file.originalname
    },

    // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images

});

const uploadCloud = multer({
    storage: storage
});

router.post(
    "/upload-img",
    uploadCloud.single("imageUrl"),
    (req, res) => {
        // if (!req.file) {
        // res.redirect("personalAccount")
        // } else {
        console.log("req.file", req.file);
        // const imageURL = req.file.url;
        // User.findById(req.user._id).then((user) => {
        //     user.image = imageURL;
        //     return user.save()
        // .then((res) => {
        // res.redirect("personalAccount");
        res.json({ secure_url: req.file.path });
        // });
    })
// }




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