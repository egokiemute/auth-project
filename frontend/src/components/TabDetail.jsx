import {
  Group,
  Heart,
  Locate,
  LocateIcon,
  MapPin,
  MapPinCheck,
  PinOff,
  Share2,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import Input from "./Input";

const TabDetail = () => {
  const { id = "9862682972" } = useParams();

  // Mock data
  const data = {
    id: "9862682972",
    images: ["/space-one.png", "/space-one.png", "/space-one.png"],
    amenities: ["WiFi", "Light", "House", "Spacious"],
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
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="py-3 flex items-center gap-3">
            <div className="flex items-center gap-3">
              <StarRating rating={data.rating} />
              <span className="font-semibold">{data.rating}</span>
              <span className="text-[#803EC2] underline text-[14px]">
                ({data.reviewsCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 p-2 rounded-full">
                <MapPin className="text-[#000000A3] size-5" />
              </div>
              <span className="text-[#000000A3]">{data.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 p-2 rounded-full">
                <Users className="text-[#000000A3] size-5" />
              </div>
              <span className="text-[#000000A3]">42 Creatives</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start pb-2">
            <h1>Amenities</h1>
            <div className="space-x-2">
              {data.amenities.map((amenity) => (
                <span className="text-xs px-3 py-1 rounded-md border-[1px] border-[#545454a3]">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-500 mt-2">{data.description}</p>
        </div>

        {/* Reservation Form */}
        <div className="lg:w-1/3 bg-[#803EC20A] p-10 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-gray-700 font-bold text-lg">₦2000</h1>
            <span className="text=-[#000000A3]  text-sm">All day access</span>
          </div>
          <div className="w-full">
            <Input label="Date" type="date" />
            <Input label="Arrival Time" type="time" />
            <Input label="Guest" placeholder="1 - No. of guest(s)" type="select" />
            <p className="text-base font-bold -mt-4">
              Available for reservation
            </p>
            <button
              className="mt-5 w-full py-3 px-4 bg-black text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
              type="submit"
              //   disabled={!email || isLoading}
            >
              Reserve
            </button>
          </div>
          {/* Add form or any placeholder for reservation here */}
        </div>
      </div>
    </div>
  );
};

export default TabDetail;
