import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ListingItem from "../ListingItem";

const listingData = [
    {
      id: "9862682972",
      images: ["/space-one.png", "/space-one.png", "/space-one.png"],
      amenities: ["Wifi", "Kitchen", "Free snacks"],
      title: "Spacious 2 Story House",
      slug: "spacious-2-story-house",
      location: "Warri, Delta State",
      rating: 3.6,
      reviewsCount: 23,
      price: 2000,
      description:
        "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
    },
    {
      id: "13226252",
      images: ["/space-one.png", "/space-one.png", "/space-one.png"],
      amenities: ["Wifi", "Kitchen", "Rest room"],
      title: "Fillup Story House",
      slug: "spacious-2-story-house",
      location: "Warri, Delta State",
      rating: 4,
      reviewsCount: 23,
      price: 2000,
      description:
        "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
    },
    {
      id: "13226252",
      images: ["/space-one.png", "/space-one.png", "/space-one.png"],
      amenities: ["Wifi", "Kitchen", "Free snacks"],
      title: "Fillup Story House",
      slug: "spacious-2-story-house",
      location: "Warri, Delta State",
      rating: 4,
      reviewsCount: 23,
      price: 2000,
      description:
        "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
    },
    {
      id: "13226252",
      images: ["/space-one.png", "/space-one.png", "/space-one.png"],
      amenities: ["Wifi", "Kitchen", "Free snacks"],
      title: "Fillup Story House",
      slug: "spacious-2-story-house",
      location: "Warri, Delta State",
      rating: 4,
      reviewsCount: 23,
      price: 2000,
      description:
        "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
    },
  ];
  

const FeaturedSpaces = () => {
  const [tabs, setTabs] = useState([]); // Initialize as an empty array

useEffect(() => {
  const fetchTabs = async () => {
    try {
      const res = await fetch(`https://usetabos-beta.onrender.com/api/auth/tabs`);
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

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white py-32">
      <div className=" container max-w-7xl mx-auto">
        {/* Core Community Section */}
        <motion.div
          className="flex flex-col gap-4 items-center justify-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col text-center mb-6">
            <h2 className="text-5xl font-bold mb-4" variants={fadeIn}>
            Our most used spaces
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-4 gap-10"
            variants={staggerContainer}
          >
            {tabs.map((listings, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start gap-3 w-[300px]"
                variants={fadeIn}
              >
                <ListingItem listing={listings} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSpaces;
