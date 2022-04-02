import React, { useEffect, useState } from "react";
import { socketService } from "../services/socket.service";
import { utilService } from "../services/util.service";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const GameRoom = () => {
  const params = useParams();
  const roomData = {
    roomId: params.id || null,
    playersCount: 0,
    gameOn: false,
    players: [
      {
        id: null,
        role: "X",
        isMyTurn: true,
      },
      {
        id: null,
        role: "O",
        isMyTurn: false,
      },
    ],
  };
  const [room, setRoom] = useState(roomData);
  const [board, setBoard] = useState(utilService.makeBoard());
  const [myIndex, setMyIndex] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  useEffect(() => {
    socketService.emit("enter game room", room);
    socketService.on("update room players", (room) => {
      setRoom(room);
    });
    socketService.on("start game", (room) => {
      setRoom(room);
    });
    socketService.on("update new move", ({ room, board }) => {
      setRoom(room);
      setBoard(board);
    });
    socketService.on("im second", (idx)=>{setMyIndex(idx)});
    return () => {
      socketService.emit("left game", myIndex);
    };
  }, []);
  const startNewGame = () => {
    setBoard(utilService.makeBoard());
    setIsVictory(false);
    setRoom(roomData);
  };

  const makeMove = (i, j) => {
    let newBoard = board.slice();
    if(!room.gameOn) return
    if (newBoard[i][j].isMarked) return;
    if (isVictory) return;
    let players = room.players;
    if (!players[myIndex].isMyTurn) return;
    let player = players[myIndex];
    let secPlayerIdx = myIndex === 1 ? 0 : 1;
    let secPlayer = players[secPlayerIdx];
    newBoard[i][j].mark = player.role;
    newBoard[i][j].isMarked = true;
    player.isMyTurn = !player.isMyTurn;
    secPlayer.isMyTurn = !player.isMyTurn;
    players[myIndex] = player;
    players[secPlayerIdx] = secPlayer;
    let victory = utilService.checkVictory(i, j, player.role, newBoard);
    setIsVictory(victory);
    setRoom((prevRoom) => {
      return { ...prevRoom, players };
    });
    setBoard(newBoard);
    socketService.emit("new move", { room, board });
  };

  return (
    <div className='gameRoom '>
      <table className='gameBoard flex justify-center align-center column'>
        {board.map((row, i) => (
          <tbody key={row + i}>
            <tr key={i} className='row'>
              {row.map((cell, j) => (
                <td key={j} className='cell' onClick={() => makeMove(i, j)}>
                  {cell.mark}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
      <div className='controllers'>
        <button>start playing</button>;
        <Link to={"/"}>
          <button>create new room</button>
        </Link>
      </div>
      <button
        onClick={() => {
          startNewGame();
        }}
      >
        NewGame
      </button>
    </div>
  );
};
