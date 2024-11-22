import React, { useState, useEffect } from "react";
import Reservation from "../components/Reservation";
import { useAuthStore } from "../store/authStore";
import { useReserveStore } from "../store/reservationStore";
import { Loader } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

// Categories to filter by
const categories = ["All", "Pending", "On-going", "Completed", "Cancelled"];

const MyReservations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { reservations, loading, error, fetchUserReservations } =
    useReserveStore();
  const { user } = useAuthStore();
  const userId = user?._id;
  console.log(user);

  // Fetch reservations when component mounts or when userId changes
  useEffect(() => {
    if (userId) {
      fetchUserReservations(userId);
    }
  }, [userId, fetchUserReservations]);

  // Map backend statuses to frontend categories
  const mapStatusToCategory = (status) => {
    switch (status) {
      case "awaiting payment":
        return "Pending";
      case "confirmed":
        return "On-going";
      case "completed":
        return "Completed";
      case "canceled":
        return "Cancelled";
      default:
        return "Other"; // Handle unexpected statuses
    }
  };

  // Filter reservations based on the selected category
  const filteredReservations = reservations.filter((res) => {
    const category = mapStatusToCategory(res.status);
    return selectedCategory === "All" || category === selectedCategory;
  });

  // console.log(reservations)
  // Loading state
  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-8 w-full p-10 rounded-2xl border border-[#0000001A]">
          <LoadingSpinner className="size-10" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-12 flex items-center justify-center">
        Error loading reservations: {error}
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col gap-4 items-start">
          <h1 className="text-3xl font-bold tracking-wide">My Reservations</h1>
          <div className="flex items-center gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`p-2 px-3 text-sm bg-white border-[2px] border-[#0000001A] text-black rounded-lg whitespace-nowrap font-medium tracking-[2px] transition-all duration-300 ease-in-out ${
                  selectedCategory === category
                    ? "text-black border-[2px] border-black bg-[#0000000d] transition-all duration-500 ease-in-out"
                    : "text-[#0C0C0CB0]"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full py-3 space-y-10">
          {reservations.length === 0 ? (
            <div className="text-center text-gray-500">
              You have no reservations at the moment.
            </div>
          ) : filteredReservations.length === 0 ? (
            <div className="text-center text-gray-500">
              No reservations found in the selected category.
            </div>
          ) : (
            filteredReservations.map((reservation) => (
              <Reservation key={reservation._id} reservation={reservation} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
