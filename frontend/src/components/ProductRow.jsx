const ProductRow = ({ product, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-5 items-center bg-white shadow-md rounded-lg p-4 mb-3">

      {/* Image */}
      <div className="flex gap-2 items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-14 h-14 object-cover rounded"
      />

      {/* Name */}
      <p className="font-semibold">{product.name}</p>
</div>
      {/* Price */}
      <p>₹ {product.price}</p>

      {/* Stock */}
      <p>{product.stock}</p>

      {/* Category */}
      <p className="text-gray-600">{product.category}</p>
  
      {/* Edit */}
      <div className="">
      <button
        onClick={() => onEdit(product.id)}
        className="bg-blue-500 m-2 rounded-md text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit
      </button>

      {/* Delete */}
      
      <button
        onClick={() => onDelete(product.id)}
        className="bg-red-500 m-2 rounded-md align-end text-white px-3 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
</div>
    </div>
  );
};

export default ProductRow;