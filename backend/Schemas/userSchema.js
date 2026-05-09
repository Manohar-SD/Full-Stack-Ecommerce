const {Schema} = require("mongoose");

const userSchema = new Schema(
    {
        name:String,
        email:String,
        role:{
            type:String,
            default:"user"
        },
        password:String,
        hash:String
    }

)

module.exports=userSchema;