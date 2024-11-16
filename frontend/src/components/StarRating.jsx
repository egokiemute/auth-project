import React from "react";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      // Full star
      return (
        <div
          key={index}
          className="w-5 h-5 bg-black mask mask-star-2"
          title={`${rating} Stars`}
        />
      );
    } else if (rating > starValue - 1 && rating < starValue) {
      // Partially filled star for decimals
      const percentage = (rating - Math.floor(rating)) * 100;
      return (
        <div
          key={index}
          className="w-5 h-5 bg-gray-200 relative mask mask-star-2"
          title={`${rating} Stars`}
        >
          <div
            className="absolute top-0 left-0 h-full bg-black mask mask-star-2"
            style={{ width: `${percentage}%` }}
          />
        </div>
      );
    } else {
      // Empty star
      return (
        <div
          key={index}
          className="w-5 h-5 bg-gray-200 mask mask-star-2"
          title={`${rating} Stars`}
        />
      );
    }
  });

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
