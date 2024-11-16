import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const Space = () => {
  const { user, logout } = useAuthStore();
  const ninStatus = user.isNinVerified;
  console.log(user)
  console.log("user")

  const handleLogout = () => {
    logout();
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-white  rounded-xl shadow-2xl border-[1px] border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-black text-transparent bg-clip-text">
        Dashboard
      </h2>
      {!ninStatus ? (
        <div className="flex gap-2 items-center mb-6">
          <div className="bg-[#8e5128] w-2 h-2 rounded-full animate-pulse" />
          <p className="text-xs text-black">NIN Under Verification</p>
        </div>
      ) : (
		<div className="flex gap-2 items-center mb-6">
          <div className="bg-[#000] w-2 h-2 rounded-full animate-pulse" />
          <p className="text-xs text-black">NIN Verified</p>
        </div>
	  )}
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-black rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.firstname}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-black rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-black  text-white 
				font-bold rounded-lg shadow-lg 
				 focus:outline-none"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
export default Space;
