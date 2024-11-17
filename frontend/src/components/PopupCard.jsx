import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const PopupCard = ({ isOpen, onClose, children }) => {
  // Disable scrolling on the background when the popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      ></div>

      {/* Popup Card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-lg">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="size-6" />
        </button>

        {/* Card Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupCard;
