import axios from "axios";
import { server } from "../../main";
import { socket } from "../../socket";

export const getConversations = () => async (dispatch) => {
  try {
    dispatch({ type: "getConversationsRequest" });

    const { data } = await axios.get(`${server}/conversations`, {
      withCredentials: true,
    });

    dispatch({ type: "getConversationsSuccess", payload: data.conversations });
  } catch (error) {
    dispatch({
      type: "getConversationsFail",
      payload: error.response.data.message,
    });
  }
};

export const getSingleConversation = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleConversationRequest" });

    const { data } = await axios.get(`${server}/conversations/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getSingleConversationSuccess",
      payload: data.conversation,
    });
  } catch (error) {
    dispatch({
      type: "getSingleConversationFail",
      payload: error.response.data.message,
    });
  }
};

export const leaveConversation = (id) => async (dispatch) => {
  try {
    dispatch({ type: "leaveConversationRequest" });

    const { data } = await axios.put(
      `${server}/conversations/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "leaveConversationSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "leaveConversationFail",
      payload: error.response.data.message,
    });
  }
};

export const createGroupChat =
  (roomName, selectedUsers) => async (dispatch) => {
    try {
      dispatch({ type: "createGroupChatRequest" });
      const { data } = await axios.post(
        `${server}/groupchat`,
        { roomName, selectedUsers },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "createGroupChatSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "createGroupChatFail",
        payload: error.response.data.message,
      });
    }
  };

export const createChat = (selectedUser) => async (dispatch) => {
  try {
    dispatch({ type: "createChatRequest" });
    const { data } = await axios.post(
      `${server}/chat`,
      { selectedUser },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "createChatSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createChatFail",
      payload: error.response.data.message,
    });
  }
};

export const sendMessage =
  (currentMessage, conversationId) => async (dispatch) => {
    try {
      dispatch({ type: "sendMessageRequest" });
      const { data } = await axios.post(
        `${server}/message`,
        {
          currentMessage,
          conversationId,
        },
        {
          withCredentials: true,
        }
      );
      socket.emit("send_message", data.sentMessage);
      dispatch({ type: "sendMessageSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "sendMessageFail",
        payload: error.response.data.message,
      });
    }
  };
