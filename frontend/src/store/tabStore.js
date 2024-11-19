import { create } from "zustand";
import axios from "axios";

// const API_URL = "http://localhost:8000/api/auth"
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api/auth" : "/api/auth";
// const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const useTabsStore = create((set) => ({
    tabs: null,
    error: null,
    isLoading: false,
    message: null,

    fetchAllTabs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/tabs`);
            set({ allTabs: response.data.tabs }); 
        } catch (error) {
            console.error("Error fetching tabs:", error);
            set({ error: error.response?.data?.message || "Failed to fetch tabs" });
        }
    },

}))