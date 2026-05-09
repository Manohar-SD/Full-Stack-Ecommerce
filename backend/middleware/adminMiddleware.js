const passport = require("passport");
module.exports = [
    passport.authenticate("jwt",{session:false}),
     (req,res,next)=>{    

        if(!req.user){
               return res.status(401).json({ message: "Unauthorized" });
        }

        if(req.user.role=="admin"){
            return next();
        }
           return res.status(403).json({ message: "Forbidden: Admins only" });
}];