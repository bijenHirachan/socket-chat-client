import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Input from "./Input";
import { toast } from "react-hot-toast";
import { createChat } from "../redux/actions/conversationActions";

const animatedComponents = makeAnimated();

const SelectOneUser = ({ users, onClose }) => {
  const [selectedUser, setSelectedUser] = useState({ value: "", label: "" });

  const dispatch = useDispatch();

  const joinRoom = (e) => {
    e.preventDefault();
    if (selectedUser.value !== "") {
      dispatch(createChat(selectedUser));
      onClose();
    } else {
      toast.error("Select a user!");
    }
  };

  return (
    <form onSubmit={joinRoom} className="flex flex-col gap-4 h-[40vh] relative">
      <h3 className="font-semibold text-gray-500 text-lg">
        Select User to Chat
      </h3>
      <Select
        placeholder="Select Users"
        value={selectedUser}
        components={animatedComponents}
        options={
          users?.length > 0 &&
          users.map((user) => ({ value: user._id, label: user.name }))
        }
        onChange={(data) => setSelectedUser(data)}
        required={true}
      />

      <div className="absolute bottom-0 w-full">
        <Button type="submit">Start Chatting</Button>
      </div>
    </form>
  );
};

export default SelectOneUser;
