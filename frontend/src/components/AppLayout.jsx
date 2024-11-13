import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Specify pages where you want to hide the header
  const hideHeaderPages = ['/login', '/signup']; 

  const hideFooter = ['/register', '/login']

  return (
    <>
      {!hideHeaderPages.includes(location.pathname) && <Header />}
      <main>{children}</main>
      {!hideFooter.includes(location.pathname) && <Footer />}
    </>
  );
};

export default AppLayout;