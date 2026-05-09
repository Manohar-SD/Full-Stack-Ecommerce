import { FaTrash } from "react-icons/fa";

const CartProduct = ({ item, increaseQty, decreaseQty, removeItem }) => {
  const total = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition mb-4">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg border"
        />

        {/* Product Info */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {item.name}
          </h3>
          <p className="text-gray-500 text-sm">
            ₹ {item.price}
          </p>
        </div>

      </div>

      {/* QUANTITY CONTROLLER */}
      <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">

        <button
          onClick={() => decreaseQty(item.productId)}
          className="px-2 py-1 bg-white rounded-md shadow hover:bg-gray-200 transition"
        >
          -
        </button>

        <span className="font-semibold text-gray-800 w-6 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQty(item.productId)}
          className="px-2 py-1 bg-white rounded-md shadow hover:bg-gray-200 transition"
        >
          +
        </button>

      </div>

      {/* TOTAL PRICE */}
      <div className="font-semibold text-gray-800 w-24 text-center">
        ₹ {total}
      </div>

      {/* DELETE */}
      <button
        onClick={() => removeItem(item.productId)}
        className="p-2 rounded-full hover:bg-red-100 transition"
      >
        <FaTrash className="text-red-500 hover:text-red-700" size={18} />
      </button>

    </div>
  );
};

export default CartProduct;