import React from "react";
import { socketService } from "../services/socket.service";
import { utilService } from "../services/util.service";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export class _GameRoom extends React.Component {
  state = {
    board: [],
  };
  componentDidMount() {
    this.loadGameBoard();
    socketService.emit("enter game room", this.props.match.params.id);
    socketService.on("game add move", this.gameMove);
  }
  loadGameBoard = () => {
    this.setState({ board: utilService.makeBoard() });
  };
  onMakeMove = () => {
    socketService.emit("game newMove", "shtok ya aabal");
  };
  gameMove = (data) => {
    console.log(data);
    console.log(this.state);
  };
  render() {
    const { board } = this.state;
    return (
      <div className="gameRoom ">
        <table className="gameBoard flex justify-center align-center column">
          {board.map((row, i) => (
            <tbody key={row + i}>
              <tr key={i} className="row">
                {row.map((col, j) => (
                  <td key={j} className="cell">
                    {col}
                  </td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
        <div className="controllers">
          <button onClick={this.onMakeMove}>start playing</button>;
          <Link to={"/"}>
            <button>create new room</button>
          </Link>
        </div>
      </div>
    );
  }
}

export const GameRoom = withRouter(_GameRoom);
