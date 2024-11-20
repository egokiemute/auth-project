import {
  Heart,
  Share2,
  MapPin,
  Users,
  // Loader,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Input from "./Input";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ReservationForm from "./ReservationForm";
import Select from "./Select";
import GuestsSelect from "./GuestsSelect";
import CustomDatePicker from "./CustomDatePicker";

const TabDetail = () => {
  const [selectedDuration, setSelectedDuration] = useState("oneDay");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(null);
  const params = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchTab = async () => {
      console.log("Params:", params);
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/auth/tab/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tab details");
        }
        console.log(response);

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setTab(data.tab); // Assuming the API returns the tab under `data.tab`
        } else {
          console.error("Error fetching tab:", data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTab();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner className="size-10" />
      </div>
    );
  }

  if (!tab) {
    return <div className="text-center py-10">Tab details not found.</div>;
  }

  console.log(tab.duration);
  const duration = tab?.duration;

  const durationOptions = Object.keys(duration).map((key) => {
    // Format the label with space between words
    const formattedKey = key.replace(/([A-Z])/g, " $1"); // Adds space before uppercase letters and then capitalizes
    return {
      value: key,
      label: `${formattedKey} - N${duration[key].price.toLocaleString()}`, // Format price with currency symbol
    };
  });

  // Handle change in selected duration
  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
  };

  return (
    <div className="container pb-32">
      {/* Top Buttons */}
      <div className="pb-10 pt-6">
        <div className="flex items-center justify-end py-4">
          <div className="flex items-center gap-3">
            <div className="border border-[#00000066] p-2 rounded-full">
              <Heart className="text-[#00000066] size-5" />
            </div>
            <div className="border border-[#00000066] p-2 rounded-full">
              <Share2 className="text-[#00000066] size-5" />
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Main Image */}
          <img
            src={tab.images?.[0] || "/assets/placeholder-image.png"}
            alt={tab.name || "Tab"}
            className="object-cover h-[400px] w-full rounded-md"
          />
          {/* Small Images */}
          <div className="grid grid-cols-2 gap-1">
            {tab.images?.slice(1).map((image, idx) => (
              <img
                key={idx}
                src={image || "/assets/placeholder-image.png"}
                alt={`Tab Image ${idx + 2}`}
                className="object-cover w-full h-[200px] rounded-md"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab Title and Reservation Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        {/* Title and Description */}
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold mt-1">{tab.name}</h1>
          <div className="py-3 flex items-center gap-3">
            {/* <div className="flex items-center gap-3">
              <StarRating rating={tab.rating || 0} />
              <span className="font-semibold">{tab.rating || "N/A"}</span>
              <span className="text-[#803EC2] underline text-[14px]">
                ({tab.reviewsCount || 0} reviews)
              </span>
            </div> */}
            <div className="flex items-center gap-2">
              <div className="border border-[#00000066] p-2 rounded-full">
                <MapPin className="text-[#00000066] size-5" />
              </div>
              <span className="text-[#000000A3] text-xl">
                {`${tab.city}, ${tab.state}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-[#00000066] p-2 rounded-full">
                <Users className="text-[#00000066] size-5" />
              </div>
              <span className="text-[#000000A3] text-xl">
                {tab.capacity || "N/A"} Creatives
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start border-b border-[#0000001A] pb-10">
            <h1 className="text-[#000000E5] text-xl mb-2 font-medium">
              Included in your reservation
            </h1>
            <div className="space-x-2">
              {tab.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 text-[#000000E5] text-sm rounded-md border-[1px] border-[#0000001A]"
                >
                  {amenity.replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[#000000A3] text-xl pt-4">{tab.description}</p>
        </div>

        {/* Reservation Form */}
        <div className="lg:w-1/3 bg-[#803EC20A] p-10 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <h1 className="text-gray-700 font-bold text-2xl">
            ₦{duration[selectedDuration].price.toLocaleString()}
            </h1>
            <span className="text-[#000000A3] text-sm">{duration[selectedDuration].label}</span>
          </div>
          <form className="w-full space-y-4">
            {/* <Input label="Commencement date" type="date" /> */}
            <CustomDatePicker />
            <Select
              label="Duration"
              options={durationOptions}
              value={selectedDuration}
              onChange={handleDurationChange}
            />
            <GuestsSelect />
            <p className="bg-white p-1 px-2 rounded-full border border-[#0000001A] w-fit text-sm font-bold -mt-10">
              Available for reservation
            </p>
            <button
              className="mt-10 w-full py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
              type="submit"
            >
              Reserve
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TabDetail;
