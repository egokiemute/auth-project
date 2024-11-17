import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  // State for toggles
  const [notifications, setNotifications] = useState({
    reservationReminders: false,
    coworkingTips: false,
    tabOSUpdates: true, // Default to true for "TabOS Updates"
  });

  // Toggle handler
  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

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
      <h1 className="text-3xl font-bold mb-2">Notification</h1>
      <p className="text-gray-600 mb-6">
        Turn on notifications to get notified of new responses on your device.
      </p>

      <div className="space-y-6">
        {/* Reservation Reminders */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold mb-1">Reservation reminders</h2>
            <p className="text-sm text-gray-500">
              Get important reminders about your reservations, and account
              activity.
            </p>
          </div>
          <button
            onClick={() => toggleNotification("reservationReminders")}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              notifications.reservationReminders ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
                notifications.reservationReminders ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Coworking Tips and Offers */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold mb-1">
              Coworking tips and offers
            </h2>
            <p className="text-sm text-gray-500">
              Inspire your next reservation with personalized recommendations
              and special offers.
            </p>
          </div>
          <button
            onClick={() => toggleNotification("coworkingTips")}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              notifications.coworkingTips ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
                notifications.coworkingTips ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* TabOS Updates */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold mb-1">TabOS updates</h2>
            <p className="text-sm text-gray-500">
              Stay up to date on the latest news from TaboS, and let us know how
              we can improve.
            </p>
          </div>
          <button
            onClick={() => toggleNotification("tabOSUpdates")}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              notifications.tabOSUpdates ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
                notifications.tabOSUpdates ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notification;
