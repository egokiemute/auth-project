import { X } from "lucide-react";
import React, { useEffect } from "react";

const PopupCard = ({ isOpen, onClose, children, heading, className }) => {
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
        className="absolute inset-0 h-[100vh] bg-[#00000066]"
        onClick={onClose}
      ></div>

      {/* Popup Card */}
      <div className={`${className} z-10 w-full bg-white rounded-lg`}>
        <div className="flex items-center gap-4 p-5">
          {/* Close Icon */}
          <button
            className=" text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="size-4 text-[#00000066]" />
          </button>
          <h1 className="text-xl font-semibold">{heading}</h1>
        </div>
        <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />

        {/* Card Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupCard;
