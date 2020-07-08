
const express = require("express");
const router = express.Router();
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
        public_id: (req, file) => file.originalname
    }
});

const uploadCloud = multer({
    storage: storage
});

router.post(
    "/upload-img",
    uploadCloud.single("storyImageUrl"),
    (req, res) => {
        console.log("req.file", req.file);
        res.json({ secure_url: req.file.path, imageName: req.file.originalname });
    })

router.post("/delete-upload-img/:name", (req, res) => {
    console.log(req.params.name)
    cloudinary.uploader.destroy(`images/${req.params.name}`, (err, result) => { console.log(result); console.log(err) })
    res.json({ message: "done" });

})


module.exports = router;