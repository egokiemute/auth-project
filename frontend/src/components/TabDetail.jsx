import { Heart, Share2, MapPin, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";
import Select from "./Select";
import GuestsSelect from "./GuestsSelect";
import CustomDatePicker from "./CustomDatePicker";
import calculateEndDateExcludingSundays from "../utils";
import toast from "react-hot-toast";
import { useReserveStore } from "../store/reservationStore";

const TabDetail = () => {
  const { initiate, isLoading, error } = useReserveStore();
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState({
    value: "oneDay",
    label: "1 day",
    price: 0,
    days: 1,
  });

  // Fetch tab details
  useEffect(() => {
    const fetchTab = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://usetabos-beta.onrender.com/api/auth/tab/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tab details");
        }
        const data = await response.json();
        if (data.success) {
          setTab(data.tab);
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

  // Prepare options from `tab.duration` once tab data is loaded
  useEffect(() => {
    if (tab) {
      setSelectedDuration({
        value: "oneDay",
        label: `1 day - ${tab.duration.oneDay.price} currency`,
        price: tab.duration.oneDay.price,
        days: tab.duration.oneDay.days,
      });
    }
  }, [tab]);

  // Update selected duration based on user selection
  const handleDurationChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = tab.duration[selectedValue];
    if (selectedOption) {
      setSelectedDuration({
        value: selectedValue,
        label: `${selectedOption.days} day(s) - ${selectedOption.price} currency`,
        price: selectedOption.price,
        days: selectedOption.days,
        description: selectedOption.description,
      });
    }
  };

  // Handle guest count change
  const handleGuestsChange = (updatedGuests) => {
    const guests = Object.values(updatedGuests).reduce(
      (sum, count) => sum + count,
      0
    );
    setTotalGuests(guests);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Calculate end date based on selected date and duration
  const endDate = calculateEndDateExcludingSundays(
    selectedDate,
    selectedDuration.days
  );

  // Calculate expected amounts
  const expectedBaseAmount = selectedDuration.price * totalGuests;
  const expectedTransactionFee = expectedBaseAmount * 0.1;
  const expectedFinalAmount = expectedBaseAmount + expectedTransactionFee;

  // console.log(
  //   user?._id,
  //   tab?._id,
  //   selectedDate,
  //   endDate,
  //   totalGuests,
  //   selectedDuration?.days,
  //   selectedDuration?.price,
  //   expectedBaseAmount,
  //   expectedTransactionFee,
  //   expectedFinalAmount
  // );

  const userId = user?._id;
  const tabId = tab?._id;
  let commencementDate = selectedDate;
  let guests = totalGuests;
  let duration = selectedDuration?.days;
  let amount = expectedFinalAmount;

  // Handle reservation form submission
  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      await initiate(
        userId,
        tabId,
        commencementDate,
        endDate,
        duration,
        guests,
        amount
      );
      // console.log("Dooooooo")
      toast.success("Reservetion initiated.");
      navigate("/reserve");
    } catch (err) {
      console.error(err);
    }
  };

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
  // const handleDurationChange = (selectedOption) => {
  //   setSelectedDuration(selectedOption);
  // };

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
              ₦{expectedFinalAmount.toLocaleString()}
            </h1>
            {/* Dynamically update the description */}
            <span className="text-[#000000A3] text-sm">
              {selectedDuration?.description || "Select a duration to see details"}
            </span>
          </div>
          <form onSubmit={handleReservation} className="w-full space-y-4">
            <CustomDatePicker onDateChange={handleDateChange} />
            <Select
              label="Choose Duration"
              options={Object.keys(tab.duration).map((key) => ({
                value: key,
                label: `${tab.duration[key].days} day${
                  tab.duration[key].days === 1 ? "" : "s"
                } - ${tab.duration[key].price} currency`,
                price: tab.duration[key].price,
                days: tab.duration[key].days,
                description: tab.duration[key].description, // Add description here
              }))}
              value={selectedDuration.value}
              onChange={handleDurationChange}
            />
            <GuestsSelect onGuestsChange={handleGuestsChange} />
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
