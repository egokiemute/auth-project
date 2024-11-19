import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setVerificationCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (verificationCode.every((digit) => digit !== "")) {
      handleVerifyEmail(new Event("submit"));
    }
  }, [verificationCode]);

  return (
    <div className="flex items-center justify-center pt-12 flex-col gap-4">
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
                  className="mt-5 w-full py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
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
              <h2 className="text-2xl font-bold text-start text-[#000000E5]">
                Let’s verify your email
              </h2>
              <p className="text-start text-[#000000A3] mb-6">
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
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-2xl font-bold bg-white text-black border-[1px] border-[#00000066] rounded-lg focus:outline-none"
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-black to-black text-white font-bold rounded-lg hover:from-black hover:to-black focus:outline-none transition duration-200"
                  type="submit"
                  disabled={
                    isLoading || verificationCode.some((digit) => !digit)
                  }
                >
                  {isLoading ? (
                    <Loader className=" animate-spin mx-auto" size={24} />
                  ) : (
                    "Verify Email"
                  )}
                </button>
              </form>
            </div>
          )}

          {stage === 3 && (
            <div className="">
              <h2 className="text-4xl mb-1 font-bold text-start text-[#000000E5]">
                Finishing sign up
              </h2>
              <p className="text-start text-[#000000A3] mb-6">
                Provide your details below to complete the signing up process.
              </p>
              <form onSubmit={handleFinalSignUp} className="space-y-4">
                <div className="w-full flex flex-col gap-1">
                  <div className="flex items-center gap-6 justify-between">
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
                  </div>
                  <span className="text-xs text-[#000000A3]">
                    Make sure this matches the name on your government ID.
                  </span>
                </div>
                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    readOnly
                  />
                  <p className="text-xs text-[#000000A3] mt-1">
                    Your email will be used to communicate reservations
                  </p>
                </div>
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
                  className="mt-5 w-full py-3 px-4 bg-black  text-white font-bold rounded-lg focus:outline-none transition duration-200"
                  type="submit"
                  disabled={isLoading || !password}
                >
                  {isLoading ? (
                    <Loader className=" animate-spin mx-auto" size={24} />
                  ) : (
                    "Agree and continue"
                  )}
                </button>
                <p className="text-xs font-normal text-[#000000A3]">
                  By selecting Agree and continue, I agree to TabOS’s 
                  <a href="terms" className="text-[#803EC2] font-bold">
                    Terms of Service
                  </a>{" "}
                  and acknowledge it’s{" "}
                  <a href="terms" className="text-[#803EC2] font-bold">
                    Privacy Policy.
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </motion.div>
      <div className="px-8 flex justify-center pb-12">
        <p className="text-base text-[#000000A3]">
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
