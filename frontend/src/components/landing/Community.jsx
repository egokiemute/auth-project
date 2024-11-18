import { motion } from "framer-motion";
import React from "react";

const Community = () => {
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
    <div className="bg-white container px-12 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Core Community Section */}
        <motion.div
          className="flex flex-col gap-4 items-center justify-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col text-center mb-8">
            <h2 className="text-4xl font-bold mb-4" variants={fadeIn}>
              Meet our Community
            </h2>
            <p className="text-2xl text-[#000000A3] font-medium">
              See what people are saying about TabOS
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[1, 2, 3].map((comm, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start gap-3 max-w-[370px]"
                variants={fadeIn}
              >
                <img
                  src={`/assets/community/comm-${comm}.jpeg`}
                  alt={`Community ${comm}`}
                  width="370px"
                  height="235px"
                  className="object-cover rounded-lg"
                />
                <h3 className="font-bold text-2xl">
                  {comm === 1
                    ? "Meet Timothy"
                    : comm === 2
                    ? "Meet Oreva"
                    : "Meet Efe"}
                </h3>
                <p className="text-[#000000A3] text-base font-medium">
                  {comm === 1
                    ? "“Convenient workspace with everything i need to work”"
                    : comm === 2
                    ? "“Well equipped and affordable space, I really enjoyed my stay”"
                    : "“See what people are saying about Tab Os”"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;