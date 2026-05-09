import { useNavigate } from "react-router-dom";

const EmptyState = ({ title, message, buttonText, redirectPath }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
        alt="empty"
        className="w-40 mb-4 opacity-80"
      />

      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 mb-4">{message}</p>

      {buttonText && (
        <button
          onClick={() => navigate(redirectPath)}
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;