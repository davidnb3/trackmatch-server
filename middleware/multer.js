const multer = require("multer");

const mimeTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // Set destination folder for saved images
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // Set a new filename for the image with date
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

module.exports = multer({ storage: storage }).single("image");
