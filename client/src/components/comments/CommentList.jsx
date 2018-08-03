import React from "react";
const CommentList = props => {
  if (props.comments) {
    let comments = props.comments.map((comment, index) => {
      return (
        <div className="card m-2" key={index} style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">From User: {comment.user_id}</h5>
            <p className="card-text">{comment.comment}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        {comments}
      </div>
    );
  } else return "";
};

export default CommentList;
