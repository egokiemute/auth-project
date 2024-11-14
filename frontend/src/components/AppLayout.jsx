import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Specify pages where you want to hide the header
  // const hideHeaderPages = ["/login", "/signup"];

  const hideFooter = ["/register", "/login"];

  return (
    <div className="font-acronym antialiased">
      <Header />
      <main className="">{children}</main>
      {!hideFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default AppLayout;
