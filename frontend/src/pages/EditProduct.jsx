import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;
const EditProduct = ()=>{
    const navigate = useNavigate();

    const {id} = useParams();


    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        description:"",
        price:0,
    });  
    console.log(productDetails);
    
    useEffect(()=>{
    const getDetails = async()=>{
        const res = await  fetch(api+`/api/products/${id}`)
        const data = await res.json();
      setProductDetails(data);

    }
    getDetails();
},[])

    const submitForm = async(event)=>{
        event.preventDefault();
        const options = {
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify(productDetails)
        }
        const res = await fetch(`http://localhost:4000/api/products/${id}`,options);
        if(res.status==200){
            navigate("/admin");
        }
    }

    return <form className="h-100vh" onSubmit={submitForm}>
        <div>
            <label htmlFor="name">Name</label>
            <input value={productDetails.name} id="name" type="text" placeholder="Name" onChange={(event)=>setProductDetails({...productDetails,name:event.target.value})} />
        </div>
    <div>
            <label htmlFor="image">Image Url</label>
            <input value={productDetails.image} id="image" type="text" placeholder="Image Url" onChange={(event)=>setProductDetails({...productDetails,image:event.target.value})} />
        </div>

         <div>
            <label htmlFor="desc">Description</label>
            <textarea value={productDetails.description} onChange={(event)=>setProductDetails({...productDetails,description:event.target.value})} cols={50} rows={10} id="desc"></textarea>  
      </div>
         <div>
            <label htmlFor="name">Price</label>
            <input value={productDetails.price} id="price" type="text" placeholder="Price" onChange={(event)=>setProductDetails({...productDetails,price:event.target.value})} />
        </div>
        <button>Edit Product</button>
    </form>
}
export default EditProduct;