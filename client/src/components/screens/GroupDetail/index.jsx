import React, { Component } from "react";
import RSVP from "../../utilities/RSVP";
import * as groupsService from "../../../services/groups";
import TagList from "../../taglist";
import Comment from "../../comments/Comment";
import { Link } from "react-router-dom";
import {me} from '../../../services/user';

class GroupDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.groupId = props.match.params.id;

    this.state = {
      group: [],
      showComments: false
    };

    this.handleShowComments = event => {
      this.setState({ showComments: !this.state.showComments });
    };

    this.handleJoinGroup = async event => {
      let user = await me();
      let user_id = user.id;
      let object = {
        user_id,
        group_id: this.state.group.id
      }
      try {
        fetch("/api/users/addToGroup", {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        this.props.history.push('/groups');
      } catch(err) {
        console.log(err);
      }
    }
  }

  async componentDidMount() {
    try {
      let group = await groupsService.one(this.groupId);
      if (!group.thumbnail_image_link)
        group.thumbnail_image_link = `/images/default_group_image.jpg`;
      this.setState({ group });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.group.name) {
      return (
        <div className="container p-5">
          <h1 className="display-4">{this.state.group.name}</h1>
          <img
            className="display-4 pb-2 featuredImage"
            src={this.state.group.thumbnail_image_link}
          />
          <h3>Time:</h3>
          <p className="lead">
            <strong>From:</strong> {this.state.group.regular_event_start_time}{" "}
            <strong>until</strong> {this.state.group.regular_event_end_time}
          </p>
          <h3>Location:</h3>
          <p className="lead">
            {this.state.group.location.address_line_one}{" "}
            {this.state.group.location.city}, {this.state.group.location.state}{" "}
            {this.state.group.location.zip}
          </p>
          <TagList selectedTags={this.state.group.tags} />
          <h3 className="mt-3">Details:</h3>
          <p>{this.state.group.details}</p>
          <button
            className="btn btn-secondary"
            onClick={group => this.handleShowComments(group)}
          >
            Show Comments
          </button>
          <Comment
            comments={this.state.group.comments}
            show={this.state.showComments}
            what="groups"
            whatId={this.state.group.id}
          />
          <div className="row mt-5">
            <button className="btn btn-info mr-3" onClick={(event) => this.handleJoinGroup(event)}>Join This Group!</button>
            <Link to="/groups">
              <button className="btn btn-primary">Go back</button>
            </Link>
          </div>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

export default GroupDetailScreen;
