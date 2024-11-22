// import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ListingItem from "../ListingItem";

// const listingData = [
//     {
//       id: "9862682972",
//       images: ["/space-one.png", "/space-one.png", "/space-one.png"],
//       amenities: ["Wifi", "Kitchen", "Free snacks"],
//       title: "Spacious 2 Story House",
//       slug: "spacious-2-story-house",
//       location: "Warri, Delta State",
//       rating: 3.6,
//       reviewsCount: 23,
//       price: 2000,
//       description:
//         "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
//     },
//     {
//       id: "13226252",
//       images: ["/space-one.png", "/space-one.png", "/space-one.png"],
//       amenities: ["Wifi", "Kitchen", "Rest room"],
//       title: "Fillup Story House",
//       slug: "spacious-2-story-house",
//       location: "Warri, Delta State",
//       rating: 4,
//       reviewsCount: 23,
//       price: 2000,
//       description:
//         "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
//     },
//     {
//       id: "13226252",
//       images: ["/space-one.png", "/space-one.png", "/space-one.png"],
//       amenities: ["Wifi", "Kitchen", "Free snacks"],
//       title: "Fillup Story House",
//       slug: "spacious-2-story-house",
//       location: "Warri, Delta State",
//       rating: 4,
//       reviewsCount: 23,
//       price: 2000,
//       description:
//         "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
//     },
//     {
//       id: "13226252",
//       images: ["/space-one.png", "/space-one.png", "/space-one.png"],
//       amenities: ["Wifi", "Kitchen", "Free snacks"],
//       title: "Fillup Story House",
//       slug: "spacious-2-story-house",
//       location: "Warri, Delta State",
//       rating: 4,
//       reviewsCount: 23,
//       price: 2000,
//       description:
//         "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
//     },
//   ];

const FeaturedSpaces = () => {
  const [tabs, setTabs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/auth/tabs`);
        const data = await res.json();
        if (data.success) {
          // Limit the tabs array to the first three items
          setTabs(data.tabs.slice(0, 3));
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
    <div className="bg-white py-32">
      <div className=" container max-w-7xl mx-auto">
        {/* Core Community Section */}
        <div className="flex flex-col gap-4 items-center justify-center mb-20">
          <div className="flex flex-col text-center mb-6">
            <h2 className="text-5xl font-bold mb-4">Our most used spaces</h2>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {tabs.map((listings, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 w-[300px]"
              >
                <ListingItem listing={listings} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpaces;
