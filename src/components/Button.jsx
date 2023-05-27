import React from "react";

const Button = ({
  type = "button",
  onClick,
  children,
  outline,
  width,
  danger,
}) => {
  return (
    <button
      type={type}
      onClick={onClick || null}
      className={`transition-all duration-300 hover:bg-blue-600 rounded-md  py-3 px-8 text-center text-base font-semibold outline-none ${
        outline
          ? "border-2 border-gray-400 text-gray-500"
          : "bg-blue-500 text-white "
      } ${width ? "w-" + width : "w-full"} ${
        danger ? "bg-red-500 hover:bg-red-600" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
