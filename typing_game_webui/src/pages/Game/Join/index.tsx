import  { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import { Socket } from "socket.io-client";

interface CustomProps {
  socket: Socket;
}
const JoinGame = ({ socket }: CustomProps) => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleJoinGame = () => {
    socket.emit("checkRoom", roomId);

    // Listen for server response
    socket.on("no_room_found", () => {
      console.log("No room found");
    });
    socket.on("room_found", () => {
      console.log("Room found");
      navigate(`/game/custom/${roomId}`);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-8 rounded shadow-md w-96 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-white bg-inherit">Join Custom Match</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 text-white"
          value={roomId}
          onChange={handleInputChange}
        />
        <button
          onClick={handleJoinGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default JoinGame;
