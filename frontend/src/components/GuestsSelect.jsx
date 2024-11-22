import { useState, useEffect } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

const GuestsSelect = ({ onGuestsChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState({
    justMe: 1, // Default value
    team: 0,
    friends: 0,
    startupSpace: 0,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateGuestCount = (key, increment) => {
    if (key === "justMe") {
      // Prevent modification of "justMe"
      return;
    }

    setGuests((prev) => {
      const updatedGuests = {
        ...prev,
        [key]: Math.max(0, prev[key] + (increment ? 1 : -1)),
      };
      onGuestsChange && onGuestsChange(updatedGuests); // Notify parent component
      return updatedGuests;
    });
  };

  // Notify parent component on mount or changes
  useEffect(() => {
    onGuestsChange && onGuestsChange(guests);
  }, [guests, onGuestsChange]);

  return (
    <div className="relative">
      <label className="font-semibold">Guests:</label>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-black text-base flex justify-between items-center w-full"
      >
        <span className="ml-2 text-gray-500">
          {Object.values(guests).reduce((sum, count) => sum + count, 0)}{" "}
          Selected
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-medium mb-4">Who is coming along</h3>
          {[
            { label: "Just me", key: "justMe" },
            { label: "My team and I", key: "team" },
            { label: "Bringing friends", key: "friends" },
            { label: "For startup space", key: "startupSpace" },
          ].map(({ label, key }) => (
            <div
              key={key}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <span className="text-sm text-black">{label}</span>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => updateGuestCount(key, false)}
                  className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  disabled={key === "justMe"} // Disable for "justMe"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="mx-3">{guests[key]}</span>
                <button
                  type="button"
                  onClick={() => updateGuestCount(key, true)}
                  className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  disabled={key === "justMe"} // Disable for "justMe"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestsSelect;
