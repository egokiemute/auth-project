import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CircleHelp,
  House,
  LogOut,
  Settings,
  Space,
  User,
  User2Icon,
  UserCogIcon,
} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const neitherPage = ["/register", "/login"];

  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/register";
  console.log(user);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const popupRef = useRef(null);

  // Toggle popup on profile image click
  const handleProfileClick = () => {
    setIsPopupOpen((prev) => !prev);
  };

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants for the popup
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="container font-acronym flex items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src="/logo.svg" alt="TabOS" />
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
          <button>
            <img
              src="/search-icon.svg"
              alt="TabOS Search Icon"
              width={16}
              height={16}
            />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="text-sm font-medium text-[#000000A3] placeholder:text-[#000000A3] outline-none focus:outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-4 text-[#000000A3] font-bold text-sm">
          <Link className="font-acronym" to="/spaces">
            Find a space
          </Link>
          {user && <Link to="reservations">My reservations</Link>}
        </ul>

        {user ? (
          <ul className="relative">
            <li
              className="flex items-center gap-1  text-slate-800 hover:bg-gray-200 hover:rounded-full p-1 transition-all ease-in-out duration-500"
              onClick={handleProfileClick}
              ref={popupRef}
            >
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={"/profile.png" || user?.profilePicture}
                alt="profile"
              />
            </li>
            {/* Popup card */}
            {isPopupOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={popupVariants}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-10"
                onClick={(e) => e.stopPropagation()}
                ref={popupRef}
              >
                <Link
                  to="/space"
                  className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <House className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" />
                  <span>View Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <div className="w-full bg-gray-200 h-[1px]" />
                <Link
                  to="/profile"
                  className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <CircleHelp className="w-5 h-5" />
                  <span>Help</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </ul>
        ) : (
          <div className="flex items-center space-x-4">
            {isLogin && (
              <Link
                className="bg-black py-2 px-5 rounded-lg text-sm font-semibold text-white flex items-center justify-center"
                to="/register"
              >
                Sign up
              </Link>
            )}
            {isSignup && (
              <Link
                className="bg-transparent border-solid border-[2px] px-4 py-1 text-center border-[#00000066] rounded-lg text-black font-semibold flex items-center justify-center"
                to="/login"
              >
                Log in
              </Link>
            )}
            {!neitherPage.includes(location.pathname) && (
              <div className="flex items-center gap-4">
                <Link
                  className="bg-transparent border-solid border-[2px] px-4 py-1 text-center border-[#00000066] rounded-lg text-black font-semibold flex items-center justify-center"
                  to="/login"
                >
                  Log in
                </Link>
                <Link
                  className="bg-black py-2 px-5 rounded-lg text-sm font-semibold text-white flex items-center justify-center"
                  to="/register"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
