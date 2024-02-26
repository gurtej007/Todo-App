const mongoose=require('mongoose');
// const connect=mongoose.connect('mongodb://127.0.0.1:27017/login');

// connect
//     .then(()=>{
//         console.log("connection open");
//     })
//     .catch((e)=>{
//         console.log('ERRROR',e);
//     })


let LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }  
})

module.exports=mongoose.model('login',LoginSchema);