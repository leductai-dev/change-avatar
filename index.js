const express = require("express");
const bodyparser = require("body-parser");
const multiparty = require("connect-multiparty");
const { error } = require("console");
const cors = require("cors");
const multer = require("multer");
const streamifier = require("streamifier");

const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");

require("dotenv").config();

const path = require("path");

const fs = require("fs");

const PORT = process.env.PORT || 2001;
const app = express();

const corsOptions = {
  origin: "http://192.168.100.24",
  optionsSuccessStatus: 200,
};

const MultiPartyMiddleware = multiparty({ uploadDir: "./images" });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer(multerStorage);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data Ready And server Also",
  });
});

app.use(express.static("uploads"));

app.post("/uploads", MultiPartyMiddleware, async (req, res) => {
  try {
    if (!req.files)
      return res.status(400).json({ message: "No file to upload" });

    console.log(req.files.upload);
    const result = await cloudinary.uploader.upload(req.files.upload.path, {
      public_id: req.files.upload.originalFilename,
    });

    fs.unlink(req.files.upload.path, (err) => {
      if (err) return console.log(err);
      console.log("File deleted succesful");
    });

    console.log(result);
    res.status(200).json({
      uploaded: true,
      url: result.url,
    });

    // var TempFile = req.files.upload;
    // var TempPathfile = TempFile.path;
    // const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);
    // if (
    //   path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
    //   ".jpg"
    // ) {
    //   fs.rename(TempPathfile, targetPathUrl, (err) => {
    //     res.status(200).json({
    //       uploaded: true,
    //       url: `${TempFile.originalFilename}`,
    //     });
    //     if (err) return console.log(err);
    //   });
    // }
    // console.log(req.files);
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload-image", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file to upload" });

    console.log(req.file);

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.filename,
    });

    res.status(201).json({
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`Server Started at PORT :${PORT}`));
