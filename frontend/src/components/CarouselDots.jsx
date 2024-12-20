import React from "react";

const CarouselDots = ({ count, currentIndex }) => {
  return (
    <div className="absolute bottom-3 inset-x-0 translate-x-[50%] flex gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentIndex ? "bg-[#FFFFFF]" : "bg-[#FFFFFF7A]"
          }`}
        ></span>
      ))}
    </div>
  );
};

export default CarouselDots;
