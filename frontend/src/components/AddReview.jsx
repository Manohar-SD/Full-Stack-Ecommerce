import { useState } from "react";

const AddReview = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/api/products/${productId}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setRating(0);
        setComment("");
        onReviewAdded(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (<div className="w-[80%] mx-auto mt-6 p-6 bg-white shadow-md rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Write a Review
      </h3>

      <form onSubmit={submitHandler} className="space-y-4">

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        {/* Comment */}
        <div> 
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Comment
          </label>
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
      <div className="flex justify-center">
          <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      </form>
    </div>
  );
};

export default AddReview;