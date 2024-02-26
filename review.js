const mongoose=require('mongoose');
const schema=new mongoose.Schema;

const review=schema({
    body:string,
    rating:number
})

module.exports=mongoose.model('review',review);