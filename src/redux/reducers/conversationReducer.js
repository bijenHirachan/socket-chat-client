import { createAction, createReducer } from "@reduxjs/toolkit";

const createGroupChatRequest = createAction("createGroupChatRequest");
const createGroupChatSuccess = createAction("createGroupChatSuccess");
const createGroupChatFail = createAction("createGroupChatFail");

const sendMessageRequest = createAction("sendMessageRequest");
const sendMessageSuccess = createAction("sendMessageSuccess");
const sendMessageFail = createAction("sendMessageFail");

const createChatRequest = createAction("createChatRequest");
const createChatSuccess = createAction("createChatSuccess");
const createChatFail = createAction("createChatFail");

const getConversationsRequest = createAction("getConversationsRequest");
const getConversationsSuccess = createAction("getConversationsSuccess");
const getConversationsFail = createAction("getConversationsFail");

const leaveConversationRequest = createAction("leaveConversationRequest");
const leaveConversationSuccess = createAction("leaveConversationSuccess");
const leaveConversationFail = createAction("leaveConversationFail");

const getSingleConversationRequest = createAction(
  "getSingleConversationRequest"
);
const getSingleConversationSuccess = createAction(
  "getSingleConversationSuccess"
);
const getSingleConversationFail = createAction("getSingleConversationFail");

const clearError = createAction("clearError");
const clearMessage = createAction("clearMessage");

export const conversationReducer = createReducer({}, (builder) => {
  builder
    .addCase(sendMessageRequest, (state) => {
      state.loading = true;
    })
    .addCase(sendMessageSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.selectedConversation.messages = [
        ...state.selectedConversation.messages,
        action.payload.sentMessage,
      ];
    })
    .addCase(sendMessageFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createChatRequest, (state) => {
      state.loading = true;
    })
    .addCase(createChatSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createChatFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createGroupChatRequest, (state) => {
      state.loading = true;
    })
    .addCase(createGroupChatSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createGroupChatFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(leaveConversationRequest, (state) => {
      state.loading = true;
    })
    .addCase(leaveConversationSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(leaveConversationFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getSingleConversationRequest, (state) => {
      state.loading = true;
    })
    .addCase(getSingleConversationSuccess, (state, action) => {
      state.loading = false;
      state.selectedConversation = action.payload;
    })
    .addCase(getSingleConversationFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getConversationsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getConversationsSuccess, (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    })
    .addCase(getConversationsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
