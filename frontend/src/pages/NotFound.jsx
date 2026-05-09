import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-4">
        The page you are looking for doesn’t exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;