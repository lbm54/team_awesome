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
    if (this.props.show) {
      return (
        <div>
          <CommentList comments={this.props.comments} />
          <CommentCreate />
        </div>
      );
    } else return null;
  }
}

export default Comment;
