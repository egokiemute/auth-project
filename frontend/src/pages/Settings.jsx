import React, { useState } from "react";
import Profile from "../components/Profile";
import Notification from "../components/Notification";
import Preference from "../components/Preference";
import { Bell, SlidersVertical, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Settings = () => {
    const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("Profile"); // Tracks the currently active tab

  // Tabs Data
  const tabs = [
    { name: "Profile", icon: <User className="text-[#00000066] size-4" />, component: <Profile user={user} /> },
    { name: "Notification", icon: <Bell className="text-[#00000066] size-4" />, component: <Notification user={user} /> },
    { name: "Preference", icon: <SlidersVertical className="text-[#00000066] size-4" />, component: <Preference user={user} /> },
  ];

  return (
    <div className="container flex items-start gap-12 py-12">
      {/* Sidebar */}
      <div className="w-1/4 p-2 bg-white h-fit rounded-xl">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.name}>
              <button
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center p-4 rounded-lg text-left w-full ${
                  activeTab === tab.name
                    ? "bg-[#0000000D] font-bold"
                    : "hover:bg-[#0000000D]"
                }`}
              >
                <div className="mr-2 border border-[#00000066] p-2 rounded-full w-fit">{tab.icon}</div>
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {tabs.find((tab) => tab.name === activeTab)?.component}
      </div>
    </div>
  );
};

export default Settings;
