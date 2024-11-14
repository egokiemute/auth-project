import React, { useState } from "react";
import CarouselDots from "./CarouselDots"; // Importing the dots component

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-48 object-cover"
      />
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-lg">
        &lt;
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-lg">
        &gt;
      </button>
      <CarouselDots count={images.length} currentIndex={currentIndex} />
    </div>
  );
};

export default Carousel;
