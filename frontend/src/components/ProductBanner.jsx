const ProductBanner = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <img
        src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg?semt=ais_user_personalization&w=740&q=80"
        alt="Banner"
        className="w-full h-[400px] object-cover opacity-60"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          New Collection 2026
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover the latest trends and upgrade your style with our premium products.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductBanner;
