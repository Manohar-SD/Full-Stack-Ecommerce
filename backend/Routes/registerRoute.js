const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Router = require("express").Router;
const router = Router();
require("dotenv").config()


router.post("/",async(req,res)=>{
    const userDetails = req.body;

   const hash = await  bcrypt.hash(userDetails.password,saltRounds)

   userDetails.hash = hash;
    try{
        const user = new User(userDetails);
        await user.save();
        console.log(user._id)
       const payload = {id:user._id};
           const token =  jwt.sign(payload,process.env.PASSPORT_SECRET);
           const {name,email,role} = user
           res.cookie("token",token,{
             httpOnly:false,
             secure:false,
             sameSite:"lax"
           }).status(201).json({messge:"Register  Succesful",token,user:{name,email,role}});
    }catch(error){
        console.log(error);
    }
    
})

module.exports=router;