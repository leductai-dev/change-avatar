const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

module.exports = multer({
  
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // Định nghĩa nơi file upload sẽ được lưu lại
      callback(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== "jpeg") {
      cb(new Error("file type is not supported"), false);
      return;
    }

    cb(null, true);
  },
});
