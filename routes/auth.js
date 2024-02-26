const express=require('express');
const cors = require('cors');
const user=require('../login');
const router = express.Router();
const {body, validationResult} = require ('express-validator')
const JWT_SECRET="gurtej"
router.use(express.json());
router.use(cors()); // Enable CORS for all routes

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authmiddleware = require('../middleware/auth');

router.post('/signup' , async(req, res)=>{
    console.log(req.body)
    const {email,username,password}=req.body;
       
    let hash=  await bcrypt.hash(password,12);
    
    try{
       
        const newUser=await user.create({
            email: email,
            username:username,
            password:hash
        })
        await newUser.save();
        let payload={
            
            id:newUser._id
            
        }
            
        let token=jwt.sign(payload,JWT_SECRET);
        res.json(token);

        
    }
    catch{
        res.status(500).send("internal server error")
    }
})
router.post('/login', async(req, res)=>{
    const {email,password}=req.body;
    const cuser= await user.findOne({email});
    if(!cuser){
        
        return res.status(400).json("error");
    }
    const hash=await bcrypt.compare(password,cuser.password);
    if(!hash){
        return res.status(400).json("error");
    }
    let payload={
        
            id:cuser._id
    
    }
    let token=jwt.sign(payload,JWT_SECRET);
    res.json(token);

})

router.get('/getuser',authmiddleware,async(req,res)=>{
    
    try{
        const id=req.id;
        const User =await user.findById(id);
        res.json(User);
    }
    catch{
        
    }
})
  
module.exports = router;