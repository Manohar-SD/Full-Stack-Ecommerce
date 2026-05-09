import { useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useState } from "react";

import {useNavigate} from "react-router-dom"
import EmptyState from "../components/EmptyState";

const api = import.meta.env.VITE_API_URL;

import { useContext } from "react";
import AuthContext from "../components/AuthContext";

const CartPage = ()=>{
// const cartItems = [
//   {
//     productId:"1",
//     name:"Nike Shoes",
//     price:1999,
//     quantity:2,
//     image:"https://picsum.photos/200"
//   }
// ];
const [cartItems,setCartItems] = useState([])

const data = useContext(AuthContext);

console.log(data)

const navigate = useNavigate();

// const [quantity,setQuantity] = useState(1);
// const [productId,setProductId] = useState("");

const getCartItems = async()=>{
    const options ={
      credentials:"include",
    }
    const res = await fetch(api+"/api/carts",options);
     const data = await res.json();
     console.log(data);
     setCartItems(data);
    
  }

 const updateCart=async(productId,action)=>{
   const options ={
      method:"PUT",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({action:action})
    }
    const res = await fetch(api+`/api/carts/update-quantity/${productId}`,options);
    if(res.status==201){
      getCartItems()
    }
  }

const increaseQty = (productId)=>{
  updateCart(productId,"increase")
}

const decreaseQty = (productId)=>{
  updateCart(productId,"decrease");
}

const removeItem = async(productId)=>{
  const options ={
      method:"DELETE",
      credentials:"include"
    }
    const res = await fetch(api+`/api/carts/${productId}`,options);
    if(res.status==201){
      getCartItems()
    }
}


const placeOrder = ()=>{
  let userDetials = localStorage.getItem("shippingDetails");
  if(!userDetials){
    localStorage.setItem("checkoutData",JSON.stringify({cartItems}));
    navigate("/shipping");      
  }
}

useEffect(()=>{
  getCartItems();
},[]);

const totalPrice = cartItems.reduce((prev,item)=>{
  return prev+ item.price*item.quantity
},0)

return  <div className="min-h-screen">  
         {cartItems.length == 0 ? <EmptyState title="Your Cart is Empty"
            message="Add items in Cart"
            buttonText="Shop Now"
            redirectPath="/products" /> : <div>
         <h1 className="text-lg m-2">Your Cart</h1>            {cartItems.map(cartItem=>{
            const {productId,price,quantity} = cartItem;
            const item = {...productId,price,quantity};
            return<CartProduct key={cartItem._id} item={item} increaseQty={()=>increaseQty(item._id)  } decreaseQty={()=>decreaseQty(item._id)} removeItem={()=>removeItem(item._id)}/> 
            })}
        <div className="flex flex-col items-center justify-center gap-3 mt-4">
  <h2 className="text-lg font-bold">
    Total: ₹{totalPrice}
  </h2>

  <button
    onClick={placeOrder}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto"
  >
    Place Order
  </button>
</div>
           </div>
}
        </div>

   
}

export default CartPage;