import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import AuthButton from "../components/AuthButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center pt-12 flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white border-[1px] border-[#00000014] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="p-8">
          <div className="flex flex-col gap-2 items-start mb-6">
            <h2 className="text-2xl font-bold text-center text-[#000000E5]">
              Login
            </h2>
            <p className="text-base text-[#000000A3]">
              Enter your details below to continue.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <Input
              // icon={Mail}
              label="Email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              // icon={Lock}
              label="Password"
              type="password"
              placeholder="Password"
              className="placeholder:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-black  text-white font-bold rounded-lg shadow-lg  focus:outline-none transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin  mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
            <div className="flex items-center mt-2 mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-black font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-full h-[2px] bg-[#00000014]" />
                <span className="text-[#000000A3] font-semibold text-sm">Or</span>
                <div className="w-full h-[2px] bg-[#00000014]" />
            </div>
            <AuthButton type="button" />
          </form>
        </div>
      </motion.div>
      <div className="px-8 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-bold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
