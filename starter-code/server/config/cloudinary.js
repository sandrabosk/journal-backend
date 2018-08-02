const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var theStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-folder', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
    // cb(null, 'my-file-name');
  }
});

const uploadCloud = multer({ storage: theStorage })

module.exports = uploadCloud;