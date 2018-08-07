import React, { Component } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      comments: []
    };

    // this.setState({comments: props.comments});

    this.refresh = (comment) => {
      console.log(comment);
      this.setState({comments: this.state.comments.concat([comment])});
    }
  }

  render() {
    if (this.props.show) {
      return (
        <div>
          <CommentList comments={this.props.comments} />
          <CommentCreate what={this.props.what} whatId={this.props.whatId} />
        </div>
      );
    } else return null;
  }
}

export default Comment;
