import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-hero-banner bg-cover bg-center h-[calc(100vh-60px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl flex flex-col gap-3 items-center text-center -mt-32"
      >
        <h1 className="text-black text-[56px] leading-[1.1] font-bold">
          Wherever work takes you, we&apos;ll find the space
        </h1>
        <p className="text-[#000000A3] text-base mb-3">
          Work can happen anywhere, and so can your next great idea. Whether
          you’re in a new city or just need a change of scenery, we’ll find the
          perfect space to keep you focused and inspired, wherever you happen to
          be.
        </p>
        <Link
          to="/spaces"
          className="bg-black py-4 px-7 rounded-lg text-base font-semibold text-white flex items-center justify-center"
        >
          Explore all spaces
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
