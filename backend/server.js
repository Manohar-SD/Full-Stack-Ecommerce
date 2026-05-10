const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config()

const port = process.env.PORT;

const cookieParser = require("cookie-parser");
const cors = require("cors");

const passport = require("passport");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
require("./config/passport");

const registerRoute =require("./Routes/registerRoute");
const loginRoute = require("./Routes/loginRoute");
const cartRoute = require("./Routes/cartRoute");
const productRoute = require("./Routes/productRoute");
const orderRoute = require("./Routes/orderRoute");

const User = require("./Models/User");
const asyncHandler = require("./utils/asyncHandler");


app.use(cookieParser());
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://agent-6a0017b984a79e229--frabjous-pudding-e62ab0.netlify.app"
   ],
    credentials:true
})); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    }catch(err){
        console.log("Database connectiion err",err)
    }
}
connectToDb();



app.use("/api/register",registerRoute);
app.use("/api/login",loginRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);




app.use("/api/me",authMiddleware,(req,res)=>{
    const {name,email,role} = req.user;
    res.status(200).json({name,email,role});
})


app.use("/api/users",adminMiddleware,asyncHandler(async(req,res)=>{
    const users = await User.find({_id:{$ne:req.user._id}})
    res.json(users)
}))

app.listen(port,()=>{
    console.log("Server Started");
})
