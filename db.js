const mongoose = require("mongoose");

let dbUrl = 'mongodb://127.0.0.1:27017/login';
// "mongodb://localhost/festdb" || 

const connecttomongo = async() =>{
    mongoose.connect(dbUrl,{useNewUrlParser: true,useUnifiedTopology:true});
}

module.exports = connecttomongo;;