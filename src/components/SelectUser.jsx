import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Input from "./Input";
import { toast } from "react-hot-toast";
import { createGroupChat } from "../redux/actions/conversationActions";

const animatedComponents = makeAnimated();

const SelectUser = ({ users, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [roomName, setRoomName] = useState("");

  const dispatch = useDispatch();

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomName !== "" && selectedUsers.length > 1) {
      dispatch(createGroupChat(roomName, selectedUsers));
      setSelectedUsers([]);
      setRoomName("");
      onClose();
    } else {
      toast.error("Please select more than one user to create group chat!");
    }
  };

  return (
    <form onSubmit={joinRoom} className="flex flex-col gap-4 h-[40vh] relative">
      <h3 className="font-semibold text-gray-500 text-lg">Create Chatroom</h3>
      <Select
        placeholder="Select Users"
        value={selectedUsers}
        components={animatedComponents}
        isMulti
        options={
          users?.length > 0 &&
          users.map((user) => ({ value: user._id, label: user.name }))
        }
        onChange={(data) => setSelectedUsers((prev) => [...data])}
        required
      />
      <Input
        type="text"
        value={roomName}
        placeholder="Enter room name"
        onChange={(e) => setRoomName(e.target.value)}
        required
      />
      <div className="absolute w-full bottom-0">
        <Button type="submit">Create Group</Button>
      </div>
    </form>
  );
};

export default SelectUser;
