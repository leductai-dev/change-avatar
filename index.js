const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
const { error } = require("console");
const cors = require("cors");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("./config/cloudinary");
const shortid = require("shortid");
const upload = require("./config/multer");
const db = require('./config/database')
db.connect();
require("dotenv").config();
const model = require('./model/userInfo')

const path = require("path");

const fs = require("fs");

const PORT = process.env.PORT || 2001;
const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const corsOptions = {
  origin: ["http://localhost:3000/","http://localhost:3001/","http://localhost:4000/"],
  optionsSuccessStatus: 200,
};

const MultiPartyMiddleware = multiparty({ uploadDir: "./images" });
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json({limit: "50mb"}));
app.use(cors());


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

    console.log(req.files.photo.originalFilename);
    const result = await cloudinary.uploader.upload(req.files.photo.path, {
      public_id: req.files.photo.originalFilename,
    });

    fs.unlink(req.files.photo.path, (err) => {
      if (err) return console.log(err);
      console.log("File deleted succesful");
    });

    console.log(`dong 65 ${result}`);
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
app.post("/get-user-info", MultiPartyMiddleware, async (req, res,next) => {
  try {
    const data = req.body
    model.findOne(data)
    .then((user)=>{
        if(user){
          return res.status(200).json({
            user
         });
        }
        else{
            return res.status(401).json({
              message:"Người dùng không tồn tại!"
           });
          }
    })
    .catch(next)
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload-image",upload.single("photo"), async (req, res,next) => {
  try {
     if (!req.body)
      return res.status(400).json({ message: "No file to upload" });
   
      const result = await cloudinary.uploader.upload(req.body.value, {
        public_id: "image"+shortid.generate(),
        notification_url: "http://localhost:3000/"
      });
      return res.status(201).json({
        message:result.url
     });
      // model.findOne({userId:'123456'})
      // .then((user)=>{
      //     if(user){
      //       model.updateOne({userId:'123456'},{
      //           "name":"Tài Đức Lê",
      //           "avatar":result.url
      //       }).then(()=>{
              
      //       }).catch(()=>{
      //         return res.status(401).json({
      //           message:"Update avatar người dùng không thành thành công"
      //        });
      //       })
      //     }
      //     else{
      //         return res.status(401).json({
      //           message:"Người dùng không tồn tại!"
      //        });
      //       }
      // })
      // .catch(next)
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, console.log(`Server Started at PORT :${PORT}`));
