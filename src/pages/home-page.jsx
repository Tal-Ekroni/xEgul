import React from "react";
import { socketService } from "../services/socket.service";
import { Link } from "react-router-dom";

export class HomePage extends React.Component {
  state = {
    roomId: '',
  };
  componentDidMount() {
    socketService.setup();
  }
  handleChange = ({ target }) => {
    this.setState({ roomId: target.value });
  };
  render() {
    const { roomId } = this.state;
    return (
      <div className="home-page flex column justify-center align-center">
        <input type="text" value={roomId} onChange={this.handleChange} />
        <Link to={`/tictactoe/${roomId}`}>
          <button>Enter a room</button>
        </Link>
      </div>
    );
  }
}
