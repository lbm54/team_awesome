import React, { Component, Fragment } from "react";
import * as commentsService from "../../services/comments";
import {me} from "../../services/user";

class CommentCreate extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      comment: ""
    };

    this.handleSubmit = async event => {
      event.preventDefault();
      let key = "group_id";
      if (props.what === "events") {
        key = "event_id";
      } 
      let user = await me();
      let user_id = user.id;
      let object = {
        comment: this.state.comment,
        [key]: this.props.whatId,
        user_id: user_id
      }
      try {
        let comment = await commentsService.insert(object);
        window.location.href = `/${this.props.what}/detail/${this.props.whatId}`;
      } catch(err) {
        console.log(err);
      }
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
          className="btn clickable mt-1"
          onClick={event => this.handleSubmit(event)}
        >
          Add Comment
        </button>
      </Fragment>
    );
  }
}

export default CommentCreate;
