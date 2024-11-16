import React from "react";
import ListingItem from "../components/ListingItem";

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

const Search = () => {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listingData.map((listings, idx) => (
          <ListingItem listing={listings} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Search;
