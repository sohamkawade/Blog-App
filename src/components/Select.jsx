import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full ">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`bg-[#18181B] text-[#F3F4F6] rounded-lg px-4 py-2 border border-[#232336] focus:ring-2 focus:ring-[#3B82F6] outline-none transition w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
