import React from 'react';
import ListingItem from '../components/ListingItem';

const listingData = {
    id: "1",
    images: [
      "/space-one.png",
      "/space-one.png",
      "/space-one.png",
    ],
    title: "Spacious 2 Story House",
    location: "Warri, Delta State",
    rating: 3.5,
    reviewsCount: 23,
    price: 2000,
    description: "Welcome to EPIC House located in Peoria AZ. This stunning and modern 3800...",
  };

const Search = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ListingItem listing={listingData} />
      {/* Additional ListingItem components for more listings */}
    </div>
  )
}

export default Search