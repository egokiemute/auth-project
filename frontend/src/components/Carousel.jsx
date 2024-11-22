import React, { useState } from "react";
import CarouselDots from "./CarouselDots"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-52 overflow-hidden">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-52 object-cover"
      />

      {/* Left Button */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-lg"
        >
          <ChevronLeft className="size-4" />
        </button>
      )}

      {/* Right Button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-lg"
        >
          <ChevronRight className="size-4" />
        </button>
      )}

      {/* Dots */}
      <CarouselDots count={images.length} currentIndex={currentIndex} />
    </div>
  );
};

export default Carousel;
