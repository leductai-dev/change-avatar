const mongoose = require('mongoose')
async function connect(){
    try{
    await mongoose.connect('mongodb://localhost:27017/changeavatar', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex :true
    });
    console.log("Kết nối server thành công");
    }
    catch (error){
    console.log("Kết nối server thất bại");
    }

}
module.exports = {connect}; // Đây là một Object