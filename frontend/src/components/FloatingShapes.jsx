import { motion } from "framer-motion";

const FloatingShapes = ({ color, size, top, delay }) => {
  return (
    <motion.div
      className={`relative rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    >
      hello
    </motion.div>
  );
};

export default FloatingShapes;
