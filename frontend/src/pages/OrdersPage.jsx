import { useEffect } from "react";
import { useState } from "react"
import OrderCard from "../components/OrderCard";
import OrdersTable from "../components/OrdersTablex";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
const OrdersPage = ()=>{
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);

    console.log(orders)

    const fetchOrders = async()=>{
        try{
            const options = {
                credentials:"include"
            }
            const res =await fetch("http://localhost:4000/api/orders/myorders",options);
        const data = await res.json()
        setOrders(data);
        
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchOrders();
    },[])

    if(loading) {<Loader/>}
    return   <div>
     
       {
       orders.length==0? <EmptyState  title="No Orders Yet"
    message="Place a Order"
    buttonText="Order Now"
    redirectPath="/products"/> :
    <>       
    <h1 className="text-lg m-2">My Orders</h1>
    C      <div className=" h-[60vh]"> 
         {   orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))
    }
            </div>
      </>
    

}
</div>
}
export default OrdersPage