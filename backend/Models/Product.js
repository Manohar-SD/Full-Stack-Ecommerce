const mongoose = require("mongoose");
const productSchema = require("../Schemas/productSchema");
const Product = mongoose.model("Product",productSchema);
module.exports=Product;
