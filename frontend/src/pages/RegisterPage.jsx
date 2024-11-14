import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import AuthButton from "../components/AuthButton";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [nin, setNin] = useState("");
  const [password, setPassword] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { initiate, signup, verifyEmail, error, isLoading } = useAuthStore();

  const handleContinueWithEmail = async (e) => {
    e.preventDefault();
    try {
      await initiate(email);
      toast.success("Verification code sent to your email.");
      setStage(2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    const verificationCodeStr = verificationCode.join("");
    try {
      await verifyEmail(verificationCodeStr);
      setStage(3);
      toast.success("Email verified successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, firstname, lastname, phone, nin);
      navigate("/space");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white border-[1px] border-[#00000014] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="p-8">
          {stage === 1 && (
            <div>
              <div className="flex flex-col gap-2 items-start mb-6">
                <h2 className="text-2xl font-bold text-center text-[#000000E5]">
                  Welcome to TabOS
                </h2>
                <p className="text-base text-[#000000A3]">
                  Enter your email to create an account.
                </p>
              </div>
              <form onSubmit={handleContinueWithEmail}>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  className="mt-5 w-full py-3 px-4 bg-black text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
                  type="submit"
                  disabled={!email || isLoading}
                >
                  {isLoading ? (
                    <Loader className=" animate-spin mx-auto" size={24} />
                  ) : (
                    "Continue with Email"
                  )}
                </button>
              </form>
              <AuthButton type="button" />
            </div>
          )}

          {stage === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-[#000000E5]">
                Verify Your Email
              </h2>
              <p className="text-center text-gray-300 mb-6">
                Enter the 6-digit code sent to your email address.
              </p>
              <form onSubmit={handleVerifyEmail}>
                <div className="flex justify-between">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-2xl font-bold bg-black text-white border-2 border-gray-600 rounded-lg focus:outline-none"
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-black to-black text-white font-bold rounded-lg shadow-lg hover:from-black hover:to-black focus:outline-none transition duration-200"
                  type="submit"
                  disabled={
                    isLoading || verificationCode.some((digit) => !digit)
                  }
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            </div>
          )}

          {stage === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-[#000000E5]">
                Create Your Account
              </h2>
              <form onSubmit={handleFinalSignUp}>
                <Input
                  label="First Name"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  readOnly
                />
                <Input
                  label="NIN Number"
                  type="number"
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordStrengthMeter password={password} />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  className="mt-5 w-full py-3 px-4 bg-black  text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
                  type="submit"
                  disabled={isLoading || !password}
                >
                  {isLoading ? "Creating Account..." : "Agree and Continue"}
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
      <div className="px-8 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-black font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
