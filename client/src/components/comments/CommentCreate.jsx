import React, { Component, Fragment } from "react";

class CommentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };

    this.handleSubmit = event => {
      event.preventDefault();
    };
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <textarea
            placeholder="Add a comment"
            className="form-control ml-2"
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
            cols="100"
            rows="10"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={event => this.handleSubmit(event)}
        >
          Add Comment
        </button>
      </Fragment>
    );
  }
}

export default CommentCreate;
