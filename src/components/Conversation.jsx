import React from "react";
import { useSelector } from "react-redux";

export const otherUser = (currentUser, users) => {
  const items = users?.filter((user) => user._id !== currentUser?._id);
  return items[0].name;
};

const Conversation = ({ selectedConversation, conversation, onClick }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-300 px-4 py-2 mx-1 border rounded cursor-pointer hover:bg-sky-400  ${
        selectedConversation?._id === conversation._id ? "bg-blue-500" : ""
      }`}
    >
      <h2
        className={`transition-all duration-300 text-lg font-semibold hover:text-white ${
          selectedConversation?._id === conversation._id
            ? "text-white"
            : "text-gray-500"
        }`}
      >
        {conversation.isGroup
          ? conversation.name
          : otherUser(user, conversation.users)}
      </h2>
    </div>
  );
};

export default Conversation;
