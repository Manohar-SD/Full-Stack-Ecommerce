import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;
const razorKey = import.meta.env.RAZOR_KEY_ID;
const Summary = () => {
  const navigate = useNavigate();

  const { cartItems, shippingAddress } =
    JSON.parse(localStorage.getItem("checkoutData")) || {
      cartItems: [],
      shippingAddress: {},
    };

  const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

     function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


  const displayRazorpay = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res){
        alert('Razropay failed to load!!')
        return ;
      }

       const resp = await fetch(api+"/api/orders/pay",{credentials:'include',method:"POST"});
       const data = await resp.json();
    const options = {
      "key": razorKey, // Enter the Key ID generated from the Dashboard 
      "currency": "INR",
      "name": `${shippingAddress.fullName}`,
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": `${data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({shippingAddress:shippingAddress,
          razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
        })

        
    }
    const res = await fetch(api+"/api/orders/",options);
     const data = await res.json();
console.log(data);
console.log(data);
  if (res.status==201) {
    // redirect to success page
    navigate("/myorders");
  } else {
    // show error
    alert("Payment Error")
  }
      }
      ,
      "notes": {
          "address": "Razorpay Corporate Office"
      },
       "prefill": {
      "name": "Test User",
      "email": "test@example.com",
      "contact": "9999999999"},
      "theme": {
          "color": "#3399cc"
      }
  };
  const paymentObject = new window.Razorpay(options); 
  paymentObject.open();
    // your same logic (no change)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl w-full max-w-6xl grid md:grid-cols-2 overflow-hidden">

        {/* 🛒 LEFT SIDE */}
        <div className="p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 border-b border-white/20 pb-3"
            >
              <div>
                <p className="text-lg font-medium">{item.productId.name}</p>
                <p className="text-sm opacity-70">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-lg">
                ₹ {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* 💳 RIGHT SIDE */}
        <div className="bg-white text-gray-800 p-8">
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>

          {/* Address */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Shipping</h3>
            <p className="text-sm text-gray-600">
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Price */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-3">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>
          </div>

          {/* 🚀 Button */}
          <button
            onClick={displayRazorpay}
            className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Pay Securely 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;