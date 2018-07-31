import React, { Component } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    return (
      <div>
        <CommentCreate />
        <CommentList comments={this.props.comments} />
      </div>
    );
  }
}

export default Comment;
