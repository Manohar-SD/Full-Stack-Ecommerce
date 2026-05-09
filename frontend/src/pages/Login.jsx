import { useState  } from "react"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../components/AuthContext";

const api = import.meta.env.VITE_API_URL;
const Login = () => {

  const {user,setUser} = useContext(AuthContext)

    const [userDetails,setUserDetails] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg] = useState("");
    const submitForm =async (event)=>{
    event.preventDefault();
        const options = {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        const res = await fetch(api+"/api/login",options)
        const data  = await res.json();
        if(res.status==201){
          localStorage.setItem("token",data.token);
          setUser(data.user)
          if(data.user.role=="admin"){
              navigate("/admin");
          }else{
navigate("/products");
          
          }
          
        } else{
          setErrorMsg(data.msg);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="flex w-[900px] bg-white shadow-lg rounded-xl overflow-hidden">

        {/* LEFT SIDE FORM */}
        <div className="w-1/2 flex flex-col justify-center p-10">

          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={submitForm} className="flex flex-col gap-4">

            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                onChange={(event)=>setUserDetails((data)=>{return {...data,name:event.target.value}})}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

           

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
              onChange={(event)=>setUserDetails((data)=>{return {...data,password:event.target.value}})}
                  placeholder="Enter Password"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
        <p>Not Having account ? <Link className="underline" to="/register">Register</Link></p>
           
           {errorMsg && <p className="text-red-500 ">{errorMsg}</p>}
            <button className="bg-sky-500 text-white p-2 rounded-md mt-4 hover:bg-sky-600 transition">
              Login
            </button>

          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-1/2 bg-sky-50 flex items-center justify-center">
          <img
            className="w-96 object-contain"
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Login Illustration"
          />
        </div>

      </div>

    </div>
  );
};

export default Login;