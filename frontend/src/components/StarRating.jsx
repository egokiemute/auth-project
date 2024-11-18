import React from "react";

const StarRating = ({ rating }) => {
  // Ensure the rating is normalized to a 0–1 scale
  const normalizedRating = Math.min(Math.max(rating / 5, 0), 1);

  return (
    <div
      className="w-6 h-6 bg-gray-200 mask mask-star-2"
      title={`${rating} out of 5`}
    >
      <div
        className="h-full bg-black mask mask-star-2"
        style={{ width: `${normalizedRating * 100}%` }}
      />
    </div>
  );
};

export default StarRating;
