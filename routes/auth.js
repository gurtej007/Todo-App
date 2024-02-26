const express=require('express');

const user=require('../login');
const router = express.Router();
const {body, validationResult} = require ('express-validator')
router.use(express.json());
const bcrypt=require('bcrypt');

router.post('/signup' , async(req, res)=>{
   
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const hash=await bcrypt.hash(password,12);
    try{
        const newUser=new user({
            email: email,
            username:username,
            password:hash
        })
        console.log(newUser)
        res.json(newUser);
        await newUser.save();
    }
    catch{
        res.status(500).json("internal  server error")
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
    res.json(cuser.username);
})
module.exports = router;