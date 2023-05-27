import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { conversationReducer } from "./reducers/conversationReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
  },
});

export default store;
