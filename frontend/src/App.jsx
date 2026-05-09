import { Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/register"
import ProductPage from "./pages/ProductsPage"
import ProductDetails from "./pages/ProductDetails"
import AdminPanel from "./pages/AdminPanel"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import CartPage from "./pages/CartPage"
import { Navigate } from "react-router-dom"
import OrdersPage from "./pages/OrdersPage"
import ShippingPage from "./pages/ShippingPage"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Summary from "./pages/summary"
import Navbar from "./components/Navbar"

import './app.css';

import { useLocation } from "react-router-dom"
import AdminProtectedRoute from "./components/AdminProtectedRoute"
import AuthContext from "./components/AuthContext"
import { useEffect, useState } from "react"
import { FaTrophy } from "react-icons/fa"
import Footer from "./components/Footer"
// const api = import.meta.env.VITE_API_URL;
function App() {


  const [user,setUser] = useState(null)

  const location  = useLocation();
  const hideNavbarRoutes = ["/login","/register"];

useEffect(()=>{
const token = localStorage.getItem("token");

  const isUser = async()=>{
   try{
     const res = await fetch("http://localhost:4000/api/me",{credentials:"include"});
     console.log(res)
    if(res.status==200){
      const user =  await res.json();
      setUser(user)
    }
     else{
      setUser(null)
     }
   }catch(err){
    console.log("Error",err)
    setUser(null)
   }
  }
  if(token){
    isUser()
  }
},[])

console.log(user)
  return (<>

  <AuthContext.Provider value = {{user,setUser}}>
  {!hideNavbarRoutes.includes(location.pathname) && <Navbar/>}
    <Routes>
      <Route path="/" element={<ProductPage/> }/>
      <Route path="/admin" element={<AdminProtectedRoute><AdminPanel/></AdminProtectedRoute>}/>
      <Route path="/products/edit/:id" element={<AdminProtectedRoute><EditProduct/></AdminProtectedRoute>}/>
    <Route path="/cart" element={
      <ProtectedRoute><CartPage/></ProtectedRoute>
      }/>
      <Route path="/products/add" element={
        <AdminProtectedRoute> <AddProduct/></AdminProtectedRoute>
       }/>
      <Route path="/products" element={<ProductPage/>}/>
      <Route path="/products/:id" element={<ProductDetails />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/summary" element={<ProtectedRoute ><Summary/></ProtectedRoute>}/>
    <Route path="/myorders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>} />
      <Route path="/shipping" element={<ProtectedRoute><ShippingPage/></ProtectedRoute>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer/>
    </AuthContext.Provider >
    </>
  )
}

export default App
