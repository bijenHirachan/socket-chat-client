import React, { useEffect, useState } from "react";
import { BsSend, BsThreeDotsVertical } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, logout } from "../redux/actions/userActions";
import SelectUser from "../components/SelectUser";
import {
  getConversations,
  getSingleConversation,
  leaveConversation,
  sendMessage,
} from "../redux/actions/conversationActions";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import Members from "../components/Members";
import Conversation, { otherUser } from "../components/Conversation";
import SelectOneUser from "../components/SelectOneUser";
import { socket } from "../socket";
import ScrollableFeed from "react-scrollable-feed";

const Home = () => {
  const [open, setOpen] = useState(false);

  const [openOneUser, setOpenOneUser] = useState(false);

  const [openUserList, setOpenUserList] = useState(false);

  const [currentMessage, setCurrentMessage] = useState("");

  const { loading, users, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const {
    loading: conversationLoading,
    conversations,
    selectedConversation,
  } = useSelector((state) => state.conversation);

  const seenList =
    selectedConversation?.messages.length > 0
      ? selectedConversation?.messages[
          selectedConversation.messages.length - 1
        ].seenUsers
          .filter((u) => u._id !== user._id)
          .map((user) => user.name)
      : [];

  const dispatch = useDispatch();

  const selectConversation = (id) => {
    dispatch(getSingleConversation(id));
    socket.emit("join_room", id);
  };

  const handleSendMessage = async () => {
    if (currentMessage !== "") {
      await dispatch(sendMessage(currentMessage, selectedConversation._id));

      socket.emit("send_message", {
        conversationId: selectedConversation._id,
        message: currentMessage,
        userId: user._id,
      });
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getConversations());
  }, []);

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      await dispatch(getSingleConversation(data.conversationId));
    });
  }, [socket]);

  // useEffect(() => {
  //   if (selectedConversation) {
  //     dispatch(getSingleConversation(selectedConversation._id));
  //   }
  // }, [selectedConversation]);

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <SelectUser users={users} onClose={() => setOpen(false)} />
        </div>
      </Modal>
      <Modal open={openOneUser} setOpen={setOpenOneUser}>
        <div>
          <SelectOneUser users={users} onClose={() => setOpenOneUser(false)} />
        </div>
      </Modal>

      <Modal open={openUserList} setOpen={setOpenUserList}>
        <Members
          selectedConversation={selectedConversation}
          onClick={() => {
            dispatch(leaveConversation(selectedConversation._id));
            setOpenUserList(false);
          }}
        />
      </Modal>
      <div className="h-screen bg-white grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 rounded border">
          <div className="p-3 grid grid-cols-3 gap-1 ">
            <button
              onClick={logoutHandler}
              className="col-span-1 flex items-center justify-center bg-blue-500 transition-all border-none outline-none hover:bg-blue-600 text-white font-bold p-2 rounded"
            >
              <BiLogOut size={24} />
            </button>
            <button
              onClick={() => setOpenOneUser(true)}
              className="col-span-1 flex items-center justify-center bg-blue-500 transition-all border-none outline-none hover:bg-blue-600 text-white font-bold p-2 rounded"
            >
              <AiOutlineUserAdd size={24} />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="col-span-1 flex items-center justify-center bg-blue-500 transition-all border-none outline-none hover:bg-blue-600 text-white font-bold p-2 rounded"
            >
              <AiOutlineUsergroupAdd size={24} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            {conversations?.map((con) => (
              <Conversation
                key={con._id}
                conversation={con}
                onClick={() => selectConversation(con._id)}
                selectedConversation={selectedConversation}
              />
            ))}
          </div>
        </div>
        <div className="border col-span-9 rounded relative">
          {!selectedConversation ? (
            <div className="h-full flex justify-center items-center ">
              <p className="text-lg font-semibold text-gray-500">
                Select a conversation to start chatting
              </p>
            </div>
          ) : (
            <>
              <div className="p-5 absolute top-0 w-full flex justify-between gap-1 items-center bg-blue-500">
                <h2 className="font-semibold text-white">
                  {selectedConversation.isGroup
                    ? selectedConversation?.name
                    : otherUser(user, selectedConversation.users)}
                </h2>
                <BsThreeDotsVertical
                  size={22}
                  className="text-white cursor-pointer"
                  onClick={() => setOpenUserList(true)}
                />
              </div>
              {/* <div className="flex flex-col gap-1 py-24 h-[80vh] px-6 overflow-y-auto"> */}
              <ScrollableFeed className="flex flex-col gap-1 py-24 px-6 h-[80vh]">
                {selectedConversation?.messages?.length > 0 &&
                  selectedConversation.messages.map((message) => (
                    <Message key={message._id} message={message} />
                  ))}
                <p className="text-xs text-gray-400 text-center mt-2">
                  {seenList?.length > 0 && `Seen by ${seenList}`}
                </p>
              </ScrollableFeed>

              {/* </div> */}
              <div className="p-5 absolute bottom-0 w-full flex gap-1 items-center">
                <input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md"
                />
                <button
                  onClick={handleSendMessage}
                  className="hover:bg-blue-600 rounded-md bg-blue-500 p-3 text-center text-base font-semibold text-white outline-none"
                >
                  <BsSend size={24} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
