const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-6 mb-6">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        
        <div>
          <p className="text-xs">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        
        </div>

        <div className="text-right">
          <p
            className={`text-xs px-3 py-1 rounded-full font-medium inline-block
              ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : order.orderStatus === "Processing"
                  ? "bg-yellow-100 text-yellow-600"
                  : order.orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {order.orderStatus}
          </p>

          <p className="text-lg font-bold text-gray-900 mt-1">
         Total :    ₹{order.totalPrice}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Items */}
      <div className="mt-4 space-y-4">
        {order.orderItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-4">

              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-14 h-14 rounded-lg object-cover border"
              />

              <div>
                <p className="text-gray-800 font-medium">
                  {item.productId.name}
                </p>
                <p className="text-sm text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>

            </div>

            {/* Right */}
            <p className="font-semibold text-gray-700">
             Item Price :  ₹{item.price}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OrderCard;