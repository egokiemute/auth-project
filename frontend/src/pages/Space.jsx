import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { Bell, SlidersVertical, Smile, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
// import { useTabsStore } from "../store/tabStore";

const Space = () => {
  const { user, logout } = useAuthStore();

  // const ninStatus = user.isNinVerified;
  // console.log(user);
  // console.log(fetchAllTabs);
  // console.log("user");

  // const handleLogout = () => {
  //   logout();
  // };
  return (
    <div className="container">
      <div className="py-16 px-4">
        <h1 className="text-3xl font-normal">
          Welcome back, <span className="font-semibold">{user.firstname}</span>
        </h1>
        <div className="flex items-center justify-start gap-4">
          <Link to="/profile">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full h-[200px] mt-10 p-4 bg-white rounded-xl border-[1px] border-[#0000001A]"
            >
              <div className="border border-[#00000066] p-2 rounded-full w-fit mb-6">
                <User className="text-[#00000066] size-5" />
              </div>
              <h2 className="text-lg font-bold mb-2 text-start bg-black text-transparent bg-clip-text">
                Profile
              </h2>
              <p className="text-[#000000A3] text-sm">
                Check your profile, update personal details and how we can reach
                you.
              </p>
            </motion.div>
          </Link>
          <Link to="/settings">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full h-[200px] mt-10 p-4 bg-white rounded-xl border-[1px] border-[#0000001A]"
            >
              <div className="border border-[#00000066] p-2 rounded-full w-fit mb-6">
                <Bell className="text-[#00000066] size-5" />
              </div>
              <h2 className="text-lg font-bold mb-2 text-start bg-black text-transparent bg-clip-text">
                Notification
              </h2>
              <p className="text-[#000000A3] text-sm">
                Choose notification preferences and how you want to be
                contacted.
              </p>
            </motion.div>
          </Link>
          <Link to="/settings">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full h-[200px] mt-10 p-4 bg-white rounded-xl border-[1px] border-[#0000001A]"
            >
              <div className="border border-[#00000066] p-2 rounded-full w-fit mb-6">
                <SlidersVertical className="text-[#00000066] size-5" />
              </div>
              <h2 className="text-lg font-bold mb-2 text-start bg-black text-transparent bg-clip-text">
                Preference
              </h2>
              <p className="text-[#000000A3] text-sm">
                Choose language preference, change password, access your data
                and delete account.
              </p>
            </motion.div>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="min-w-md w-full mt-10 p-8 flex items-center justify-center bg-[#00000005] rounded-xl border-[1px] border-[#0000001A]"
        >
          <div className="text-center max-w-xs flex flex-col items-center">
            <div className="bg-[#0000000D] border border-[#0000000D] p-2 rounded-full w-fit mb-2">
              <Smile className="text-[#00000066] size-5" />
            </div>
            <p className="text-base text-[#000000A3]">
              Don't have any active tab, book your first tab now near you!
            </p>
            <Link
              to="/spaces"
              className="mt-5 w-fit py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
            >
              Book a space now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Space;
