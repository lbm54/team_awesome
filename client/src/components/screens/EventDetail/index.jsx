import React, { Component } from "react";
import RSVP from "../../utilities/RSVP";
import * as eventsService from "../../../services/events";
import TagList from "../../taglist";
import Comment from "../../comments/Comment";
import { Link } from "react-router-dom";
import { me, isLoggedIn } from "../../../services/user";
import { NotificationManager } from "react-notifications";

class EventDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.eventId = props.match.params.id;

    this.state = {
      event: {
        name: "",
        start_time: "",
        end_time: "",
        location: {
          address_line_one: "",
          address_line_two: "",
          city: "",
          state: "",
          zip: ""
        },
        tags: []
      },
      showComments: false
    };

    this.handleShowComments = event => {
      this.setState({ showComments: !this.state.showComments });
    };

    this.handleDeleteEvent = event => {
      try {
        fetch(`/api/events/${this.eventId}`, {
          method: "delete"
        });
        NotificationManager.success("Event Deleted");
        this.props.history.push('/events');
      } catch (err) {
        NotificationManager.error("Event Failed to Delete");
      }
    };
  }

  async componentDidMount() {
    try {
      let event = await eventsService.one(this.eventId);
      event = eventsService.formatEvent(event);
      this.setState({ event });
      if (isLoggedIn()) {
        let user = await me();
        if (user) {
          let user_id = user.id;
          if (user_id === event.host_user_id) {
            $("#editEventButton").toggle();
            $("#deleteEventButton").toggle();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let editEventLink = `/events/edit/${this.state.event.id}`;
    return (
      <div className="container center-block eventsListingContainer">
        <h1 className="display-4 eventListingHeader">
          {this.state.event.name}
        </h1>
        <img
          className="display-4 pb-2 featuredImage"
          src={this.state.event.thumbnail_image_link}
        />
        <h3 className="subheading">
          <span className="headingSpan">Host:</span>
        </h3>
        <p className="lead">
          {this.state.event.hosted_by}
        </p>
        <h3 className="subheading">
          <span className="headingSpan">Time:</span>
        </h3>
        <p className="lead">
          <strong>From:</strong> {this.state.event.start_time}{" "}
          <strong>until</strong> {this.state.event.end_time}
        </p>

        <h3 className="subheading">
          <span className="headingSpan">Where:</span>
        </h3>
        <p className="lead">
          {this.state.event.location.address_line_one}{" "}
          {this.state.event.location.city}, {this.state.event.location.state}{" "}
          {this.state.event.location.zip}
        </p>

        <h3 className="mt-3 subheading">
          {" "}
          <span className="headingSpand"> Details:</span>
        </h3>
        <p>{this.state.event.details}</p>
        <TagList selectedTags={this.state.event.tags} />
        <button
          className="btn hasBeenClicked"
          onClick={event => this.handleShowComments(event)}
        >
          Show Comments
        </button>
        <Comment
          comments={this.state.event.comments}
          show={this.state.showComments}
          what="events"
          whatId={this.state.event.id}
        />
        <div className="row mt-5">
          <Link
            className="btn btn-warning mr-3"
            style={{ display: "none" }}
            id="editEventButton"
            to={editEventLink}
          >
            Edit This Event
          </Link>
          <button
            className="btn btn-danger mr-3"
            style={{ display: "none" }}
            id="deleteEventButton"
            onClick={e => this.handleDeleteEvent(e)}
          >
            Delete This Event
          </button>
          <RSVP event={this.state.event} />
          <Link to="/events">
            <button className="btn hasBeenClicked ml-3">Go back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default EventDetailScreen;
