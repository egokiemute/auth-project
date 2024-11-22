import { create } from "zustand";
import axios from "axios";

// Define the API URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

export const useReserveStore = create((set) => ({
  reservation: null, // Stores the current reservation
  reservations: [], // Stores the list of all reservations
  error: null, // Stores the error message
  isLoading: false, // Tracks the loading state
  message: null, // General message

  // Set a single reservation
  setReservation: (userReservation) =>
    set({
      reservation: userReservation,
      error: null,
    }),

  // Add a new reservation to the list
  addReservation: (newReservation) =>
    set((state) => ({
      reservations: [...state.reservations, newReservation],
      error: null,
    })),

  // Fetch all reservations
  fetchAllReservations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/reserve/all`);
      set({ reservations: response.data.reservations, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch reservations",
        isLoading: false,
      });
      console.error("Error fetching reservations:", error);
    }
  },

  // Fetch a single reservation by ID
  fetchReservation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/reserve/${id}`);
      set({
        reservation: response.data.reservation,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch reservation",
        isLoading: false,
      });
      console.error("Error fetching reservation:", error);
    }
  },

  // Initiate a reservation
  initiate: async (
    userId,
    tabId,
    commencementDate,
    endDate,
    duration,
    guests,
    amount
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reserve`, {
        userId,
        tabId,
        commencementDate,
        endDate,
        duration,
        guests,
        amount,
      });
      const newReservation = response.data.reservation;
      set((state) => ({
        reservation: newReservation,
        reservations: [...state.reservations, newReservation],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in reservation",
        isLoading: false,
      });
      throw error;
    }
  },

  // Update reservation status
  status: async (reservationId, status) => {
    console.log(reservationId);
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reserve/${reservationId?.reservationId}/status`, {
        status,
      });
      console.log(response);
      const updatedReservation = response.data.data;
      console.log(updatedReservation);
      set((state) => ({
        reservations: state.reservations.map((reservation) =>
          reservation.id === reservationId._id
            ? { ...reservation, status: updatedReservation.status }
            : reservation
        ),
        reservation: updatedReservation,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating reservation",
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch reservations for a specific user
  fetchUserReservations: async (userId) => {
    set({ loading: true, error: null }); // Set loading state

    try {
      const response = await axios.get(`${API_URL}/reservations/user/${userId}`);
      set({ reservations: response.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch reservations", loading: false });
    }
  },


  // Clear all reservations (for cleanup)
  clearReservations: () => set({ reservations: [], reservation: null }),
}));
