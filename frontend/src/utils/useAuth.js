// import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie'; // If you're using cookies for tokens

// const useAuth = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   useEffect(() => {
//     // Check for token in cookies or localStorage
//     const token = Cookies.get('authToken'); // Replace 'authToken' with your cookie key
//     setIsLoggedIn(!!token); // Set true if token exists, otherwise false

//     // Show popup if not logged in
//     if (!token) {
//       setShowLoginPopup(true);
//     }
//   }, []);

//   const closePopup = () => setShowLoginPopup(false);

//   return { isLoggedIn, showLoginPopup, closePopup };
// };

// export default useAuth;
