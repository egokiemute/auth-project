import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

const Input = ({ icon: Icon, label, type = 'text', ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && isPasswordVisible ? 'text' : type;

  return (
    <div className="relative">
      {/* Render the label if it exists */}
      {label && (
        <label className="block text-base font-medium text-[#000000E5] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Icon container on the left */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="size-5 text-black" />
          </div>
        )}
        {/* Input field */}
        <input
          {...props}
          type={inputType}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} ${
            isPasswordType ? 'pr-10' : 'pr-3'
          } py-2 bg-white rounded-lg border border-[#00000066] focus:outline-none appearance-none outline-none text-black placeholder-gray-400 transition duration-200`}
        />
        {/* Password visibility toggle icon on the right */}
        {isPasswordType && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="w-5 h-5 text-[#00000066]" />
            ) : (
              <EyeIcon className="w-5 h-5 text-[#00000066]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
