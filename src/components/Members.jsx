import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";

const Members = ({ selectedConversation, onClick }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <h3 className="text-2xl text-gray-600 font-semibold mb-2">
        {selectedConversation.isGroup ? "Members" : ""}
      </h3>
      <div className="flex flex-col gap-2">
        {selectedConversation?.users.length > 0 &&
          selectedConversation.users
            .filter((u) => u._id !== user._id)
            .map((convoUser) => (
              <UserItem key={convoUser._id} user={convoUser} />
            ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onClick} width="1/2" danger>
          {selectedConversation.isGroup ? "Leave Group" : "Leave Chat"}
        </Button>
      </div>
    </>
  );
};

export default Members;
