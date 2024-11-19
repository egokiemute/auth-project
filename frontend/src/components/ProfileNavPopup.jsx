import { motion } from "framer-motion";
import React, { useEffect } from "react";

const ProfileNavPopup = ({ isOpen, onClose, children, className }) => {
  // Disable scrolling on the background when the popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

 // Variants for the container
 const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Time between child animations
      },
    },
    exit: { opacity: 0 },
  };

  // Variants for each link
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
    initial="hidden"
    animate={isOpen ? "visible" : "hidden"}
    exit="hidden"
    variants={containerVariants}

      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 h-[100vh] bg-white bg-opacity-10"
        onClick={onClose}
      ></div>

      {/* Popup Card */}
      <div className={`${className} z-10 w-full bg-white rounded-lg`}>
        {/* Card Content */}
        <motion.div
        className="relative"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={containerVariants}
      >{children}</motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileNavPopup;
