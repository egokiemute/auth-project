import React, { createContext, useContext, useState } from "react";

// Create the Context
const AppContext = createContext();

// Context Provider
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    reservationDetails: null,
    user: null,
  });

  const updateReservationDetails = (details) => {
    setState((prevState) => ({
      ...prevState,
      reservationDetails: details,
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateReservationDetails }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access
export const useAppContext = () => useContext(AppContext);
