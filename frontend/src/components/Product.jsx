
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Product = ({product})=>{
const navigate = useNavigate();
const {name,price,image,_id} = product;
    

    return  <Link to={`/products/${_id}`}  className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={name}
        
        className="w-full min-w-60 h-52 object-cover"
      />

      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className=" text-lg font-bold text-gray-600 mt-2"> ₹  {price}</p>
      </div>
    </Link>
}
export default Product;