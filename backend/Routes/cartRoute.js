const Product = require("../Models/Product");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../Models/User");

const Cart = require("../Models/Cart");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/",authMiddleware,async(req,res)=>{
    const {items} = await Cart.findOne({ userId: req.user._id ,}).populate("items.productId");
    res.json(items);    
})

router.put("/update-quantity/:id",authMiddleware,async(req,res)=>{
    const userId = req.user._id;
    
    const productId = new mongoose.Types.ObjectId(req.params.id);
    let value = req.body.action=="increase" ? 1 : -1
        await Cart.updateOne({userId,"items.productId":productId},{$inc:{"items.$.quantity":value}});
    
    
    res.status(201).json({msg:"done"});
})

router.post("/",authMiddleware, async (req, res) => {
    const { quantity, productId } = req.body;

    const userCart = await Cart.findOne({ userId: req.user._id });

    const { price } = await Product.findById(productId);
    console.log(userCart);
    let msg = "";
    try {
        if (userCart != null) {

            const product = userCart.items.find((item)=>item.productId==productId)
            if(product==undefined){
            await Cart.updateOne({ userId: req.user._id }, {
                $push: {
                    items: {
                        productId, price, quantity
                    }
                }
            })
            msg = "item added to cart"}
            else{
                await Cart.updateOne({userId:req.user._id,"items.productId":productId},{
                    $inc:{"items.$.quantity":quantity}
                })
                msg="increased";
            }
        }
        else {
            const item = new Cart({
                userId: req.user._id,
                items: [
                    {
                        productId, price, quantity
                    }
                ],
                totalPrice: price * quantity
            });
            await item.save()
            msg = "cart created"
        }

        res.status(201).json(msg);
    } catch (err) {
        console.log(err);
    }
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    const {id } = req.params;
    const userId = req.user._id;
console.log(id);

    let msg = await Cart.updateOne({userId},{$pull:{items:{productId:id}}});
   console.log(msg)
    res.status(201).json({msg});

})

module.exports = router;
