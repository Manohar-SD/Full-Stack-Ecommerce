import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ShippingForm = () => {


  const navigate = useNavigate();
  const [shippingAddress, setshippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: ""
  });

  const handleChange = (e) => {
    setshippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    localStorage.setItem("checkoutData",JSON.stringify({...data,shippingAddress}))
    
    // const options = {
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     credentials:"include",
    //     body:JSON.stringify({shippingAddress:shippingAddress})
    // }

    // const res = await fetch("http://localhost:4000/api/orders/",options);
    // const data = await res.json();
    // console.log(data)
    //  navigate("/myorders");
   navigate("/summary");
  };




  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingAddress.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={shippingAddress.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
          required
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={shippingAddress.pincode}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
            required
          />
        </div>

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Continue to Checkout
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;