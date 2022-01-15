import React from "react";

export class HomePage extends React.Component {
  state = {
    roomId: "",
  };
  handleChange = ({ target }) => {
    this.setState({ roomId: target.value }, console.log(this.state));
  };
  render() {
    const { roomId } = this.state;
    return (
      <div className="home-page flex column justify-center align-center">
        <input type="text" value={roomId} onChange={this.handleChange} />
        <button>Enter a room</button>
      </div>
    );
  }
}
