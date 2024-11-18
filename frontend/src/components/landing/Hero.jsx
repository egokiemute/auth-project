import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-hero-banner bg-cover bg-center h-[720px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl flex flex-col gap-3 items-center text-center -mt-16"
      >
        <h1 className="text-black text-5xl font-bold">
          Wherever work takes you, we&apos;ll find the space
        </h1>
        <p className="text-[#000000A3] text-base">
          Our coworking space fuels productivity anywhere. Join us to connect
          with professionals and find a workspace that adapts to your needs.
        </p>
        <Link
          to="/spaces"
          className="bg-black py-2 px-5 rounded-lg text-sm font-semibold text-white flex items-center justify-center"
        >
          Explore all spaces
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
