import React, { useState } from "react";
import ListingItem from "../components/ListingItem";
import PopupCard from "../components/PopupCard";

const listingData = [
  {
    id: "9862682972",
    images: ["/space-one.png", "/space-one.png", "/space-one.png"],
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

const Spaces = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listingData.map((listings, idx) => (
          <ListingItem listing={listings} key={idx} />
        ))}
      </div>
      <div className="pb-12 pt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wide mb-1">
          Can't find a Tab close to you?
        </h1>
        <button onClick={() => setIsPopupOpen(true)} className="mt-5 w-fit py-3 px-4 bg-black text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200">
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
