import { BookCheck, House, Users } from "lucide-react";
import React from "react";

const Summary = () => {
  return (
    <div className="border-[0.5px] border-gray-400 py-5 px-4 rounded-xl bg-white w-fit mt-10 mb-10">
      <h1 className="text-xl font-bold">Your stats</h1>
      <div className="flex items-center w-full gap-4 pt-4">
        <div className="flex items-center justify-between border-[0.5px] border-gray-400 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col items-start">
            <h1>No. of user</h1>
            <span className="font-bold text-lg">490</span>
          </div>
          <div className="border border-gray-300 p-2 rounded-full">
            <Users className="text-[#000000A3] size-5" />
          </div>
        </div>
        <div className="flex items-center justify-between border-[0.5px] border-gray-400 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col items-start">
            <h1>No. of reservations</h1>
            <span className="font-bold text-lg">490</span>
          </div>
          <div className="border border-gray-300 p-2 rounded-full">
            <BookCheck className="text-[#000000A3] size-5" />
          </div>
        </div>
        <div className="flex items-center justify-between border-[0.5px] border-gray-400 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col items-start">
            <h1>No. of spaces</h1>
            <span className="font-bold text-lg">490</span>
          </div>
          <div className="border border-gray-300 p-2 rounded-full">
            <House className="text-[#000000A3] size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
