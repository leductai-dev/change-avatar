const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "kent-clound",
  api_key: "887921563917991",
  api_secret: "EqdRD5G8qBu_64AyfSuCIVP8gfc",
});

module.exports = cloudinary;
