import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import StarRating from "./StarRating";
import { Heart } from "lucide-react";

const ListingItem = ({ listing }) => {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Image Carousel */}
      <div className="relative">
        <Carousel images={listing.images || ["/default.jpg"]} /> {/* Default image if none provided */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-lg">
          <Heart className="text-gray-500 hover:text-red-500" />
        </button>
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg text-gray-800 font-semibold">
          ₦{listing.price}
        </div>
      </div>

      {/* Listing Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <div className="flex items-center gap-1 text-sm my-2">
          <StarRating rating={listing.rating} />
          <span className="font-semibold">{listing.rating}</span>
          <span className="text-gray-500">({listing.reviewsCount} reviews)</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">
          {listing.description}
        </p>
        <Link
          to={`/listing/${listing.id}`}
          className="text-blue-600 mt-2 inline-block"
        >
          Available for Reservation
        </Link>
      </div>
    </div>
  );
};

export default ListingItem;
