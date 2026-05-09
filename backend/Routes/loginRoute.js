const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const bcrypt = require("bcrypt")
require("dotenv").config();
router.post("/",async(req,res)=>{
  try{
  const {name,password} = req.body;
    const user = await User.findOne({name});

    const isMatched =  await bcrypt.compare(password,user.hash);
    if(!isMatched){
        res.status(400).json({msg:"Wrong Password"})
    }
    const payload = {id:user._id};
    const token =  jwt.sign(payload,process.env.PASSPORT_SECRET);
      const {email,role} = user;
    res.cookie("token",token,{
      httpOnly:false,
      secure:false,
      sameSite:"lax"
    }).status(201).json({messge:"Login Succesful",token,user:{name,email,role}});
  }catch(error){
    res.json({msg:"User Not Found"});
  }
})

module.exports= router;