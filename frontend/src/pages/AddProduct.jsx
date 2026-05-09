import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;
const AddProduct = ()=>{
    const navigate = useNavigate();
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        description:"",
        price:0,
    });  
    console.log(productDetails);
    
    const submitForm = async(event)=>{
        event.preventDefault();
        const options = {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify(productDetails)
        }
        const res = await fetch(api+"/api/products",options);
        if(res.status==201){
            navigate("/admin");
        }
    }

    return <form className="h-100vh" onSubmit={submitForm}>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Name" onChange={(event)=>setProductDetails({...productDetails,name:event.target.value})} />
        </div>
<div>
            <label htmlFor="image">Image Url</label>
            <input id="image" type="text" placeholder="Image Url" onChange={(event)=>setProductDetails({...productDetails,image:event.target.value})} />
        </div>

         <div>
            <label htmlFor="desc">Description</label>
            <textarea  onChange={(event)=>setProductDetails({...productDetails,description:event.target.value})} cols={50} rows={10} id="desc"></textarea>  
      </div>
         <div>
            <label htmlFor="name">Price</label>
            <input id="price" type="text" placeholder="Price" onChange={(event)=>setProductDetails({...productDetails,price:event.target.value})} />
        </div>
        <button>Add Product</button>
    </form>
}
export default AddProduct;