import { Star, StarHalf } from "lucide-react";
import React from "react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return <Star key={index} className="text-yellow-500" />;
    } else if (rating >= index + 0.5) {
      return <StarHalf key={index} className="text-yellow-500" />;
    } else {
      return <Star key={index} className="text-yellow-500" />;
    }
  });

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
