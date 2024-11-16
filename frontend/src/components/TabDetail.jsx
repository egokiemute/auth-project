import { Group, Heart, Locate, LocateIcon, MapPin, MapPinCheck, PinOff, Share2, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";

const TabDetail = () => {
  const { id = "9862682972" } = useParams();

  // Mock data
  const data = {
    id: "9862682972",
    images: ["/space-one.png", "/space-one.png", "/space-one.png"],
    title: "Spacious 2 Story House",
    slug: "spacious-2-story-house",
    location: "Warri, Delta State",
    rating: 3.6,
    reviewsCount: 23,
    price: 2000,
    description:
      "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
  };

  return (
    <div className="container p-6">
      {/* Top Buttons */}
      <div className="pb-10">
        <div className="flex items-center justify-end py-4">
          <div className="flex items-center gap-3">
            <div className="border border-gray-300 p-2 rounded-full">
              <Heart className="text-gray-300 size-5" />
            </div>
            <div className="border border-gray-300 p-2 rounded-full">
              <Share2 className="text-gray-300 size-5" />
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Main Image */}
          <img
            src="/assets/space-two.png"
            alt="space one"
            className="object-cover h-[400px] w-full rounded-md"
          />
          {/* Small Images */}
          <div className="grid grid-cols-2 gap-1">
            <img
              src="/space-one.png"
              alt="space one"
              className="object-cover w-full h-[200px] rounded-md"
            />
            <img
              src="/assets/space-three.png"
              alt="space one"
              className="object-cover w-full h-[200px] rounded-md"
            />
            <img
              src="/assets/space-four.png"
              alt="space one"
              className="object-cover w-full h-[200px] rounded-md"
            />
            <img
              src="/assets/space-five.png"
              alt="space one"
              className="object-cover w-full h-[200px] rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Tab Title and Reservation Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        {/* Title and Description */}
        <div className="lg:w-1/2">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <div className="py-4 flex items-center gap-3">
            <div className="flex items-center gap-3">
              <StarRating rating={data.rating} />
              <span className="font-semibold">{data.rating}</span>
              <span className="text-[#803EC2] underline text-[14px]">
                ({data.reviewsCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 p-2 rounded-full">
                <MapPin className="text-gray-300 size-5" />
              </div>
              <span>{data.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 p-2 rounded-full">
                <Users className="text-gray-300 size-5" />
              </div>
              <span>42 Creatives</span>
            </div>
          </div>
          <p className="text-gray-500 mt-2">{data.description}</p>
        </div>

        {/* Reservation Form */}
        <div className="lg:w-1/3">
          <p className="text-gray-700 font-medium">Reservation Form</p>
          {/* Add form or any placeholder for reservation here */}
        </div>
      </div>
    </div>
  );
};

export default TabDetail;
