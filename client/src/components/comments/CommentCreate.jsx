import React, { Component } from "react";

class CommentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };

    this.handleSubmit = (event) => {
        event.preventDefault();
    }
  }

  render() {
    return (
      <div>
        <textarea value={this.state.comment} onChange={(event) => this.setState({comment: event.target.value})} cols="20" rows="20" />
        <button className="btn btn-primary" onClick={(event) =>  this.handleSubmit(event)} />
      </div>
    );
  }
}

export default CommentCreate;
