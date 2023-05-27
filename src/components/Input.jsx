import React from "react";

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  required,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required || false}
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md"
    />
  );
};

export default Input;
