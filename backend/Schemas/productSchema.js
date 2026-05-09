const {Schema} = require("mongoose");

const productSchema = new Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    stock:{
        type:String,
        default:"in stock"
    },category:{
        type:String,
        default:"Electronics"
    },rating:{
                type:Number,
                default:0
            },
            numReviews:{
                type:Number,
                default:0
            },
    reviews:{
        type:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            name:String,
            rating:Number,
            comment:String
            
        },
        
    ],
    default:[]
    }
})
module.exports = productSchema
