import React, { useState } from "react";
import Reservation from "../components/Reservation";

// Categories to filter by
const categories = ["All", "Pending", "On-going", "Completed", "Cancelled"];
const MyReservations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col gap-4 items-start">
          <h1 className="text-3xl font-bold tracking-wide">My reservations</h1>
          <div className="flex items-center gap-4">
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
        <div className="w-full py-3">
            <Reservation />
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
