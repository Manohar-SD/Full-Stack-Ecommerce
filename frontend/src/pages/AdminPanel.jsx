import { useEffect, useState } from "react";
import ProductRow from "../components/ProductRow";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTablex";
import EmptyState from "../components/EmptyState";

const api = import.meta.env.VITE_API_URL;
const AdminPanel = () => {

const [products,setProducts] = useState([]);

const navigate = useNavigate();

const [orderStatus,setOrderStatus] = useState("Processing");

const [users,setUsers] = useState([]);

 const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);


    const fetchOrders = async()=>{
        try{
            const options = {
                credentials:"include"
            }
            const res =await fetch(api+"/api/orders/",options);
        const data = await res.json()
        setOrders(data);
        
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false);
        }
    }

    const getProducts = async () => {
    const url = api+"/api/products";
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  }
 const getUsers = async () => {
  const options = {
                credentials:"include"
            }
    const url = api+"/api/users";
    const res = await fetch(url,options);
    const data = await res.json();
    setUsers(data);
  }

    useEffect(()=>{
        fetchOrders();
        getProducts()
        getUsers();
    },[])



const onStatusChange = async(obj)=>{
  const options = {
    method:"PUT",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({orderStatus:obj.orderStatus})

  }

  await fetch(api+`/api/orders/${obj.id}`,options);
  fetchOrders();
  
}

const editProduct = (id) => {
  navigate(`/products/edit/${id}`) ;
}
const addProduct = ()=>{
  navigate("/products/add");
}
const deleteProduct = async(id)=>{
 const options={
  method:"DELETE",
  credentials: "include",
 } 
 const res = await fetch(api+`/api/products/${id}`,options);
 if(res.status==200)
 {
  navigate("/admin");
 }
}



  return <div className="bg-gray-50 h-100vh p-3">
    <h1 className="text-4xl">Dashboard</h1>

    <div className="flex m-3 justify-between align-center">
      <h3 className="text-2xl">Manage Products</h3>
      <button  onClick={addProduct} className="bg-green-400 text-white px-2 py-1 rounded-md">Add New Product</button>
    </div>
    <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded font-semibold text-gray-700">
      <p>Product</p>
      <p>Price</p>
      <p>Stock</p>
      <p>Category</p>
      <p className="">Actions</p>
    </div>
  {products.map((product)=><ProductRow key={product._id} product={product} onDelete={()=>deleteProduct(product._id)} onEdit={()=>editProduct(product._id)}/>)}


  <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>

      {users.length === 0 ? (
        <div className="text-center text-gray-500">No users found</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <br />
 <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>


    <div>
      {orders.length==0 ? <h1>No Orders</h1>  : <OrdersTable orders={orders} onStatusChange={onStatusChange}  />}
    </div>


  </div>

}
export default AdminPanel;