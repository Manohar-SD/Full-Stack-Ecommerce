const {Schema, Types } = require("mongoose");

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[
                {
            productId:
            {
            type:Schema.Types.ObjectId,
            ref:"Product"
        },
        
            quantity:Number,
            price:Number
        }
    ],
    totalPrice:{type:Number,required:true},
      shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      country: String
    },
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        default :"ONLINE"
    },
    isPaid:{
        type:Boolean
    },
    orderStatus:{
        type:String,
        enum:["Processing","Shipped","Delivered","Cancelled"],
        default:"Processing"
    }
},{timestamps:true});

module.exports = orderSchema