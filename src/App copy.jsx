import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col w-1/2">
          <input
            type="text"
            value={room}
            placeholder="Enter room name"
            onChange={(e) => setRoom(e.target.value)}
          />{" "}
          <button onClick={joinRoom}>Join Room</button>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
      <h3 className="text-center">Message</h3>
      <p className="text-center">{messageReceived}</p>
    </>
  );
}

export default App;
