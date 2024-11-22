import { motion } from "framer-motion";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { app } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

const AuthButton = () => {
  // const auth = getAuth(app);
  // const navigate = useNavigate();
  // const { setUser } = useAuthStore();

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     const userDetails = {
  //       name: user.displayName,
  //       email: user.email,
  //       profilePicture: user.photoURL,
  //       isVerified: user.emailVerified,
  //     };

  //     const res = await fetch("http://localhost:8000/api/auth/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userDetails),
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       // Set user in the store
  //       setUser(data.user);
  //       navigate("/space"); // Navigate directly here
  //     } else {
  //       console.error("Backend authentication failed:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Google sign-in error:", error);
  //   }
  // };

  return (
    <div className="mt-5 w-full">
      <motion.button
        className="w-full flex items-center justify-center text-center gap-2 py-3 px-4 bg-transparent border-2 border-gradient-to-r from-black to-black text-black font-medium rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:opacity-80 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        // onClick={handleGoogleLogin}
      >
        <img src="/google.svg" alt="google signup" />
        <span>Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default AuthButton;
