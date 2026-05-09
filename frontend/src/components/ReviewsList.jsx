import Rating from "./Rating";

const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-6">
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h3>


    




      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
           <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-lg">
          {review.name}
        </h3>

        {/* Rating Badge */}
        <div className="bg-yellow-100 text-yellow-600 text-sm font-semibold px-3 py-1 rounded-full">
          {review.review}.0 ★
        </div>
      </div>

      {/* Stars */}
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl transition ${
              star <= review.rating
                ? "text-yellow-400 drop-shadow-sm"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="mt-3 text-gray-600 leading-relaxed italic">
        “{review.comment}”
      </p>
    </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;