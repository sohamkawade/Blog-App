import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-white text-sm sm:text-base" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`bg-[#18181B] text-[#F3F4F6] rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-[#232336] focus:ring-2 focus:ring-[#3B82F6] outline-none transition w-full text-sm sm:text-base ${className}`}
        ref={ref}
        {...props}
        id={id}
        style={type === 'file' ? { fontSize: '14px' } : {}}
      />
    </div>
  );
});

export default Input;
