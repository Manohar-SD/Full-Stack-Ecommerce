const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        
        <div>
          <h2 className="text-2xl font-bold text-white">Ecommerce</h2>
          <p className="mt-3 text-sm">
            Your one-stop destination for all your shopping needs. Quality products, best prices.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">My Orders</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe to get latest offers</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-yellow-500 px-4 py-2 rounded-r-md text-black font-semibold hover:bg-yellow-400">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;