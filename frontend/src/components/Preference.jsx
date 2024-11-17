// components/Preference.js
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Preference = () => {
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold mb-1">Change password</h2>
            <p className="text-sm text-gray-500">
              Get important reminders about your reservations, and account
              activity.
            </p>
          </div>
          <Link to="/reset-password">
            <ChevronRight className="size-6" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Preference;
