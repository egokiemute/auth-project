import React, { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import PopupCard from "../components/PopupCard";

const Spaces = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tabs, setTabs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch(`https://usetabos-beta.onrender.com/api/auth/tabs`);
        const data = await res.json();
        if (data.success) {
          setTabs(data.tabs); // Ensure you're setting the `tabs` array
        } else {
          console.error("Failed to fetch tabs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };

    fetchTabs();
  }, []);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {tabs.map((tab, idx) => (
          <ListingItem key={idx} listing={tab} />
        ))}
      </div>
      <div className="pb-12 pt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wide mb-1">
          Can't find a Tab close to you?
        </h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="mt-5 w-fit py-3 px-4 bg-black text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
        >
          Request for a Tab
        </button>
      </div>
      <PopupCard isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-xl font-bold">This is a reusable popup card!</h2>
        <p className="mt-2 text-gray-600">
          You can use this popup anywhere for anything.
        </p>
      </PopupCard>
    </div>
  );
};

export default Spaces;
