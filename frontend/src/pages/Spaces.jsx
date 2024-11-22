import React, { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import PopupCard from "../components/PopupCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Spaces = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tabs, setTabs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch(`https://usetabos-beta.onrender.com/api/auth/tabs`);
        const data = await res.json();
        if (data.success) {
          setTabs(data.tabs); // Set the `tabs` array
        } else {
          console.error("Failed to fetch tabs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tabs:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTabs();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {/* Content when loading is complete */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tabs.length > 0 ? (
              tabs.map((tab, idx) => <ListingItem key={idx} listing={tab} />)
            ) : (
              <p className="text-center col-span-3 text-gray-500">
                No tabs available.
              </p>
            )}
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
        </>
      )}
      {/* Popup card */}
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
