import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AllReservation = () => {
  return (
    <div className="border-[0.5px] border-gray-400 py-5 px-4 rounded-xl bg-white w-fit mt-20 mb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Reservations</h1>
        <div className="flex items-center gap-2">
          <Link className="font-bold text-sm underline" to={"/hello"}>
            All reservations
          </Link>
          <ChevronRight className="size-4" />
        </div>
      </div>
      <div>
        <p>Reservation Table</p>
      </div>
    </div>
  );
};

export default AllReservation;
