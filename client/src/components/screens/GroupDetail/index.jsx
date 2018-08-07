import React, { Component } from "react";
import RSVP from "../../utilities/RSVP";
import * as groupsService from "../../../services/groups";
import TagList from "../../taglist";
import Comment from "../../comments/Comment";
import { Link } from "react-router-dom";
import { me, isLoggedIn } from "../../../services/user";
import { NotificationManager } from "react-notifications";

class GroupDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.groupId = props.match.params.id;

    this.state = {
      group: {
        name: "",
        regular_event_start_time: "",
        regular_event_end_time: "",
        location: {
          address_line_one: "",
          city: "",
          state: "",
          zip: ""
        },
        tags: [],
        comments: []
      },
      showComments: false
    };

    this.handleShowComments = event => {
      this.setState({ showComments: !this.state.showComments });
    };

    this.handleJoinGroup = async event => {
      try {
        let user = await me();
        let user_id = user.id;
        let object = {
          user_id,
          group_id: this.state.group.id
        };
        fetch("/api/users/addToGroup", {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        NotificationManager.success(`Joined group ${this.state.group.name}`);
        this.props.history.push("/groups");
      } catch (err) {
        NotificationManager.error("Not logged in or already a member");
        console.log(err);
      }
    };

    this.handleDeleteGroup = event => {
      try {
        fetch(`/api/groups/${this.groupId}`, {
          method: "delete"
        });
        NotificationManager.success("Group Deleted");
        this.props.history.push("/groups");
      } catch (err) {
        NotificationManager.error("Group Failed to Delete");
      }
    };
  }

  async componentDidMount() {
    try {
      let group = await groupsService.one(this.groupId);
      if (isLoggedIn()) {
        let user = await me();
        if (user) {
          let user_id = user.id;
          if (user_id === group.host_user_id) {
            $("#editGroupButton").toggle();
            $("#deleteGroupButton").toggle();
          }
        }
      }
      if (!group.thumbnail_image_link)
        group.thumbnail_image_link = `/images/default_group_image.jpg`;
      this.setState({ group });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let editGroupLink = `/groups/edit/${this.state.group.id}`;
    return (
      <div className="container p-5 eventsListingContainer">
        <h1 className="display-4 createContainer">{this.state.group.name}</h1>
        <img
          className="display-4 pb-2 featuredImage"
          src={this.state.group.thumbnail_image_link}
        />
        <h3 className="subheading">
          <span className="headingSpan">Time:</span>
        </h3>
        <p className="lead">
          <strong>From:</strong> {this.state.group.regular_event_start_time}{" "}
          <strong>until</strong> {this.state.group.regular_event_end_time}
        </p>
        <h3 className="subheading">
          <span className="headingSpan">Where:</span>
        </h3>
        <p className="lead">
          {this.state.group.location.address_line_one}{" "}
          {this.state.group.location.city}, {this.state.group.location.state}{" "}
          {this.state.group.location.zip}
        </p>

        <h3 className="mt-3 subheading">
          <span className="headingSpan">Details:</span>
        </h3>
        <p>{this.state.group.details}</p>
        <TagList selectedTags={this.state.group.tags} />
        <button
          className="btn hasBeenClicked mt-3"
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
          <Link
            className="btn btn-warning mr-3"
            style={{ display: "none" }}
            id="editGroupButton"
            to={editGroupLink}
          >
            Edit This Group
          </Link>
          <button
            className="btn btn-danger mr-3"
            style={{ display: "none" }}
            id="deleteGroupButton"
            onClick={e => this.handleDeleteGroup(e)}
          >
            Delete This Group
          </button>
          <button
            className="btn clickable mr-3"
            onClick={event => this.handleJoinGroup(event)}
          >
            Join This Group!
          </button>
          <Link to="/groups">
            <button className="btn hasBeenClicked">Go back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default GroupDetailScreen;
