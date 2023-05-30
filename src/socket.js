import { io } from "socket.io-client";

// const URL = "http://localhost:4000";
const URL = "https://socket-chat-server-p8u6.onrender.com";

export const socket = io(URL, { autoConnect: false });
