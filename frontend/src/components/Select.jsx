import { ChevronDownIcon } from 'lucide-react';

const Select = ({ icon: Icon, label, options = [], ...props }) => {
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
        {/* Select field */}
        <select
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-10 py-2 bg-white rounded-lg border border-[#00000066] focus:outline-none text-black placeholder-gray-400 transition duration-200 appearance-none`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Dropdown arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-[#00000066]" />
        </div>
      </div>
    </div>
  );
};

export default Select;