const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "taiducle",
  api_key: "625786467125856",
  api_secret: "R2EK_vi3H2NzIHlfaz3q9fWpOyY",
});

module.exports = cloudinary;
