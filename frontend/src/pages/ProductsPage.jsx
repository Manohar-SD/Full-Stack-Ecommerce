import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProductList from "../components/ProductList";
import ProductBanner from "../components/ProductBanner";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

const api = import.meta.env.VITE_API_URL;
const ProductPage = ()=>{


    const query =new  URLSearchParams(useLocation().search);
    const search = query.get("search") || "";

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const getProducts = async()=>{
          setLoading(true)
            const url = api+`/api/products?search=${search}`;
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        }
        getProducts()
    },[search])


     
     
  return  <div className="bg-gray-50 min-h-100vh">

 <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 text-center">
  <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Smart Shopping Experience
  </h1>

  <p className="text-lg opacity-90 mb-6">
    Secure payments, fast delivery, and an admin-powered system.
  </p>

 <button
  onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
  className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
>
  Explore Products ↓
</button>
</div>
 <h1 className="text-lg m-2">Featured Products</h1>
        {products.length==0? 
      <EmptyState  title="Something went wrong"
    message="Please try again later"
    buttonText="Retry"
    redirectPath="/"
      /> : (!loading ? <ProductList products={products}  /> : <Loader/>)}
<br /><br />
 <div className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-500 text-sm">
              Get your products delivered quickly at your doorstep.
            </p>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">💳 Secure Payment</h3>
            <p className="text-gray-500 text-sm">
              100% secure payment with Razorpay integration.
            </p>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">⭐ Quality Products</h3>
            <p className="text-gray-500 text-sm">
              Only top-rated and verified products.
            </p>
          </div>

        </div>
      </div>


    </div>    
}
export default ProductPage;