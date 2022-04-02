import React, { useEffect, useState } from "react";
// import { socketService } from "../services/socket.service";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [roomId, setRoomId] = useState('');

 
  const handleChange = ({ target }) => {
    setRoomId(target.value);
  };

  return (
    <div className="home-page flex column justify-center align-center">
      <input type="text" value={roomId} onChange={handleChange} />
      <Link to={`/tictactoe/${roomId}`}>
        <button>Enter a room</button>
      </Link>
    </div>
  );
};
