import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  static showMessage(message) {
    // this.setState({ message });
    // setTimeout(() => {
    //   this.setState({ message: "" });
    // }, 5000);

    render(<div className="bg-primary text-white">{message}</div>);
  }

  render() {
    if (this.state.message) {
      return <div className="bg-primary text-white">{this.state.message}</div>;
    } else return null;
  }
}

export default Message;
