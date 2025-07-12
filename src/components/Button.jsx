import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 cursor-pointer py-2 rounded-lg  hover:scale-105  focus:ring-2 focus:ring-[#6366F1] outline-none transition-all duration-200 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
