import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
const Navbar = ()=>{
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const {user,setUser}= useContext(AuthContext);
console.log(user)
const changeLoginStatus = ()=>{
    if(user){
        setUser(null)
    }
    else{
     navigate("/login")   
    }
}

const onSearch =async ()=>{
  
  navigate(`/products?search=${search}`)
  setSearch("")
}
    
    return <div className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <img 
        onClick={()=>navigate("/")}
        className="cursor-pointer h-8 md:h-10 object-contain" src="https://www.bing.com/th/id/OIP.pncqNZcr3Io5XyKBaJpIFwHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
         <div className="flex w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border rounded-l-xl px-4 py-2 focus:outline-none"
        />
        <button onClick={onSearch} className="bg-indigo-600 text-white px-4 rounded-r-xl">
          Search
        </button>
      </div>
      {user ? 
        <div className="flex gap-4 hover-pointer">
        <button onClick={()=>navigate(user ? "/cart" :"/register")}>{user ? "Cart" :"SignUp"}</button>
      {user &&   <button onClick={()=>navigate("/myorders")}>Orders</button>
      }
        <button 
        onClick={changeLoginStatus} 
        >{user ? "Logout" :"Login"}</button>
      
      {/* <button onClick={()=>navigate("/admin")}>Admin</button>
       */}
      </div>:  
      <div>
           <button onClick={()=>navigate(user ? "/cart" :"/register")}>{user ? "Cart" :"SignUp"}</button> &nbsp; &nbsp;
   
      <button 
        onClick={changeLoginStatus} 
        >{user ? "Logout" :"Login"}</button>
      </div>
      }
     

    </div>
}
export default Navbar