import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const ReservationForm = () => {
  const [dateRange, setDateRange] = useState([null, null]); // Start and end dates
  const [startDate, endDate] = dateRange; // Destructure start and end dates
  const [arrivalTime, setArrivalTime] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Arrival Time:", arrivalTime);
    console.log("Guest Count:", guestCount);
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      {/* Custom Date Range Picker */}
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select date range"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Arrival Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
        <input
          type="time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Guest Count */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Guest</label>
        <input
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          min={1}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

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
  );
};

export default ReservationForm;
