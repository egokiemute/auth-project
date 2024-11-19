import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import StarRating from "./StarRating";
import { Heart } from "lucide-react";

const ListingItem = ({ listing }) => {
  // const navigate = useNavigate();
  // const goToTabDetail = (id) => {
  //   navigate(`/tab/${id}`);
  // };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-sm overflow-hidden relative">
      {/* Image Carousel */}
      <div className="relative">
        <Carousel images={listing.images || ["/default.jpg"]} />{" "}
        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs text-gray-800 font-semibold">
          Reservations available
        </div>
      </div>
      <Link to={`/tab/${listing._id}`}>
        {/* Listing Details */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-end">
              <h3 className="font-semibold text-xl text-gray-900">
                ₦{listing.price}
              </h3>
              <span className="text-[#000000E5] text-base font-normal">
                /day
              </span>
            </div>
            {/* <div className="flex items-center gap-1 text-sm my-2">
              <StarRating rating={listing.rating} />
              <span className="font-semibold text-sm">{listing.rating}</span>
              <span className="text-[#803EC2] underline text-sm">
                ({listing.reviewsCount} reviews)
              </span>
            </div> */}
          </div>
          <h3 className="font-semibold text-xl text-[#000000E5]">
            {listing.title}
          </h3>
          <p className="text-sm text-[#000000A3] line-clamp-2 mb-2">
            {listing.description}
          </p>
          <p className="text-sm text-[#000000A3]">
            {listing.city}, {listing.state}
          </p>
          <div className="flex items-center gap-2 text-[#000000A3] text-base font-medium mt-1">
            {listing?.amenities?.map((perk, index) => (
              <React.Fragment key={perk}>
                <span>
                  {perk.replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
                {index < listing.amenities.length - 1 && <span>&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
