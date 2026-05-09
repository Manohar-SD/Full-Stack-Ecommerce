const passport = require("passport");
const Product = require("../Models/Product");
const adminMiddleware = require("../middleware/adminMiddleware");


const router = require("express").Router();

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

router.get("/",async(req,res)=>{
    const {search}  = req.query;
    console.log(req.query)
    const keyword = search
  ? { name: { $regex: search, $options: "i" } }
  : {};
  console.log(keyword)
    const products = await Product.find(keyword);
    res.send(products);
});

router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.send(product);

})

router.post("/",adminMiddleware,async(req,res)=>{
        const prdouctDetails = req.body;
        const product = new Product(prdouctDetails);
        await product.save();
        res.status(201).send({msg:"product added"});
})
router.put("/:id",secureAuth,async(req,res)=>{
    const {id} = req.params;
    const prdouctDetails = req.body;
    console.log(id);
    
    
    await Product.updateOne({_id:id},{$set:prdouctDetails})
    res.send("Product Updated");
})
router.delete("/:id",secureAuth,async(req,res)=>{
    const {id}=req.params;
    await Product.deleteOne({_id:id});
    res.status(200);
})

router.post("/:id/reviews",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {rating,comment} = req.body;
    const {id} = req.params;
   const product =  await Product.findById(id);
   if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    

    const alreadyReviewd = product.reviews.find((r)=>{
        r.user.toString()==req.user._id
    })
    if(alreadyReviewd){
        res.status(400).json({message:"Product Already Reviewd"})
    }

const review = {
        user:req.user._id,
        name:req.user.name,
        rating,
        comment 
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
     product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

      await product.save();
      res.status(201).json({message:"Review Added"});

    }catch(err){
        res.status(500).json({message:err.message})
    }


})



module.exports=router;