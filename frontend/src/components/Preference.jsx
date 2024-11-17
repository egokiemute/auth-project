// components/Preference.js
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopupCard from "./PopupCard";

const Preference = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-8"
    >
      <Link
        className="text-base text-[#000000A3] flex items-center gap-2 mb-4"
        to="/space"
      >
        <ArrowLeft className="size-4" />
        <span>Go back</span>
      </Link>
      <h1 className="text-3xl font-bold mb-2">Preference</h1>
      <p className="text-gray-600 mb-6">
        Choose language preference, change password, access your data and delete
        account.
      </p>

      <div className="space-y-6">
        {/* Reservation Reminders */}
        <button onClick={() => setIsPopupOpen(true)} className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start">
            <h2 className="text-base font-bold mb-1">Change password</h2>
            <p className="text-sm text-gray-500">
              Get important reminders about your reservations, and account
              activity.
            </p>
          </div>
            <ChevronRight className="size-6" />
        </button>
        <PopupCard
        className="max-w-md h-[268px] relative"
        heading="Change password"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <div className="p-5">
          <p className="mt-2 text-gray-600">
            Cancelling this reservation, no going back and it will permanently
            delete from your account and host.
          </p>
        </div>
        <div className="bg-white absolute bottom-0 w-full rounded-b-2xl">
          <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />
          <div className="flex items-center justify-end gap-4 p-5">
            <button
              className="py-3 px-4 bg-transparent text-[#000000A3] border-[1px] border-[#00000066] font-bold rounded-lg focus:outline-none transition duration-200"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              className="py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
              //   onClick={() => setIsPopupOpen(true)}
            >
              Update password
            </button>
          </div>
        </div>
      </PopupCard>
      </div>
    </motion.div>
  );
};

export default Preference;
