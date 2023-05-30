import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`rounded px-4 py-2 flex flex-col w-fit ${
        user?._id === message?.sender._id
          ? "border border-gray-400 self-end"
          : "bg-blue-500"
      }`}
    >
      <h3
        className={`text-sm font-semibold ${
          user?._id === message?.sender._id
            ? "text-gray-600 text-right"
            : "text-white"
        }`}
      >
        {user?._id === message?.sender._id ? "Me" : message.sender.name}
      </h3>
      <p
        className={`text-sm ${
          user?._id === message?.sender._id ? "text-gray-500" : "text-white"
        }`}
      >
        {message.body}
      </p>
    </div>
  );
};

export default Message;
