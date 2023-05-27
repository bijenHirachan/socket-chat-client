import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket } from "./socket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import { Toaster } from "react-hot-toast";

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    error,
    message: userMessage,
  } = useSelector((state) => state.user);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data.message);
  //     setMessageReceived(data.message);
  //   });
  // }, [socket]);

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="h-screen ">
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
