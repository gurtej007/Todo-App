const mongoose=require('mongoose');
// const connect=mongoose.connect('mongodb://127.0.0.1:27017/login');

// connect
//     .then(()=>{
//         console.log("connection open");
//     })
//     .catch((e)=>{
//         console.log('ERRROR',e);
//     })


let TodoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'login'
    },
    Todo:{
        type:String,
        required: true,
        
    },
    
})

module.exports=mongoose.model('TodoSchema',TodoSchema);