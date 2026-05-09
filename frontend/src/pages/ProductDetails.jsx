import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import AddReview from "../components/AddReview"
import ReviewList from "../components/ReviewsList"
import { useContext } from "react";
import AuthContext from "../components/AuthContext";

const ProductDetails = () => {
const {id }= useParams();

const {user} = useContext(AuthContext)

const [product,setProduct] = useState([]);

const [quantity,setQuantity] = useState(1);
const navigate = useNavigate();

const increaseQty = ()=>{
    setQuantity(quantity+1);
  
}

const decreaseQty = ()=>{
   if(quantity>1){
    setQuantity(quantity-1);
  }
}
  const getDetails = async()=>{
        const res = await  fetch(`http://localhost:4000/api/products/${id}`)
        const data = await res.json();
      setProduct(data);

    }
useEffect(()=>{
  const getDetails = async()=>{
        const res = await  fetch(`http://localhost:4000/api/products/${id}`)
        const data = await res.json();
      setProduct(data);

    }
    getDetails();
},[])

const addToCart =async ()=>{

  if(!user){
    navigate("/login")
  }

  const cartItem = {
    productId:id,
    quantity,
    price:product.price
  }
  const url = "http://localhost:4000/api/carts";
  const options = {
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify(cartItem)
  }
  const res = await fetch(url,options);
  if(res.status==201){
   navigate("/cart")
  }
}
    

console.log(product)
  return (
    <>
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-10 p-6 md:flex">
      
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-2">&#8377; &nbsp;{product.price}</p>
   
          <p
           
          >
            {product.stock}
          </p>
           <Rating value={product.rating} />
            <p className="mb-2">{product.numReviews} reviews</p>
        </div>

    <div>
      <button onClick={decreaseQty} className="p-2 bg-blue-600">-</button>
     &nbsp;<span className="text-lg text-bold"> {quantity} </span> &nbsp;
      <button onClick={increaseQty} className="p-2 bg-blue-600">+</button>

    </div>

        {/* <button
          
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
        >
          Buy Now
        </button> */}
        <button
          
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
          onClick={addToCart}
        >
         Buy Now
        </button>

      </div>
{/* 
          <p>
            {product.description}
          </p> */}
     
    </div>
    <br />
<div className="mx-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">About the Product </h2>
  <p>
  {product.description}
</p>

<br /> 

          {product.reviews  && (<ReviewList reviews={product.reviews} />)}
            <AddReview
        productId={product._id}
        onReviewAdded={getDetails}
      />
      </div>
</>
  );
};

export default ProductDetails;