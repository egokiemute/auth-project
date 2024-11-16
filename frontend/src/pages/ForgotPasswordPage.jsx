import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
              Forgot your password?
            </h2>
            <p className="text-base text-[#000000A3]">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Input
                // icon={Mail}
                label="Email"
                type="email"
                // placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-black  text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
                type="submit"
              >
                {isLoading ? (
                  <Loader className="size-6 animate-spin mx-auto" />
                ) : (
                  "Send reset link"
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-300 mb-6">
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
            </div>
          )}
        </div>
      </motion.div>
      <div className="px-8 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-[#000000A3] flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to{" "}
            <span className="text-black underline font-semibold ml-1">
              {" "}
              Login
            </span>
          </Link>
        </div>
    </div>
  );
};
export default ForgotPasswordPage;
