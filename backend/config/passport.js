const passport = require("passport");
const User = require("../Models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const dotenv= require("dotenv").config()

const options = {
    secretOrKey:process.env.PASSPORT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([(req)=>req?.cookies?.token])
}

passport.use(new JwtStrategy(options,async(payload,done)=>{
    console.log(payload);
    try{
     const user = await User.findOne({_id:payload.id});
        if(user){
            return done(null,user);
        }
        return done(null,false);
    }catch(err){
        return done(err,false);
    }
}))
