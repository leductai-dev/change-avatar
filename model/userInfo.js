const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userInfo = new Schema({
    userId:{ type: String, default: '0000' },
    username: { type: String, default: 'username' },
    password: { type: String },
    phone: { type: String,  min: 5,default: '123456'  },
    avatar: { type: String, default: "" },
  },{
    timestamps:true,
  });

module.exports = mongoose.model('User-Information', userInfo);