const passport = require("passport");

const Order = require("../Models/Order")
const Cart = require("../Models/Cart");


const crypto = require("crypto");
const router = require("express").Router();
require("dotenv").config();

const Razorpay = require("razorpay");
const authMiddleware = require("../middleware/authMiddleware");

const instance = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

const secureAuth = [
    passport.authenticate("jwt",{session:false}),
     (req,res,next)=>{    
        console.log(req.user);
        
        if(req.user.role=="admin"){
            next();
        }
        else{
            res.send("Unauthorized Access");
        }
}];


const verifyPayment = (req, res,next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "YDKO1tYkc0YYICaMcWgkRMZJ")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ Payment is valid
    // Update order in DB
    next();
  } else {
    res.json({ msg:"Payment Failed"});
  }
};

router.post("/",authMiddleware,verifyPayment,async(req,res)=>{
  try{
      const {shippingAddress} =  req.body;

      const {items} = await  Cart.findOne({userId:req.user._id});
   const totalPrice =  items.reduce((acc,item)=>{
        return acc+item.quantity*item.price
    },0);

   const order = new Order({
    userId:req.user._id,
    orderItems:items,
    isPaid:true,
    paymentMethod:"ONLINE",
    shippingAddress,
    totalPrice
   })

   await order.save();
   await Cart.deleteOne({userId:req.user._id});
   res.status(201).json({msg:"Order Created"});
  }catch(err){
    console.log(err)
    res.status(500).json({msg:"Server Error "+err.msg});
  }
})

router.get("/myorders",authMiddleware,async (req,res)=>{
    const userOrders = await Order.find({userId:req.user._id}).populate({path:"orderItems.productId"});
    res.json(userOrders);

})
router.get("/:id",authMiddleware,async (req,res)=>{
    const {id} = req.params;
    const userOrders = await Order.find({_id:id});
    res.json(userOrders);

})
router.get("/",secureAuth,async (req,res)=>{
    
    try{
      const orders = await Order.find({});
    res.json(orders);
    }catch(err){
      console.log(err)
    }

})

router.put("/:id",secureAuth,async (req,res)=>{
   try{
    console.log("coming")
     const {orderStatus} = req.body;
    const {id} = req.params;
    let val = await Order.updateOne({_id:id},{$set:{orderStatus:orderStatus}})
    console.log(val);
    res.json({msg:"Status Updated"})

   }catch(err){
    console.log(err)
   }
})

router.post("/pay",authMiddleware,async(req,res)=>{
  try {

    const {items} = await  Cart.findOne({userId:req.user._id})
   const totalPrice =  items.reduce((acc,item)=>{
        return acc+item.quantity*item.price
    },0);
console.log("coming")

      const options = {
      // 20 INR in paise
      amount:totalPrice*100,
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      const order = await instance.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({ error: error.message });
    }
})


module.exports = router;