import React, { Component } from "react";
import RSVP from "../../utilities/RSVP";
import * as eventsService from "../../../services/events";
import TagList from "../../taglist";
import Comment from "../../comments/Comment";
import { Link } from "react-router-dom";

class EventDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.eventId = props.match.params.id;

    this.state = {
      event: [],
      showComments: false
    };

    this.handleShowComments = event => {
      this.setState({ showComments: !this.state.showComments });
    };
  }

  async componentDidMount() {
    try {
      let event = await eventsService.one(this.eventId);
      event = eventsService.formatEvent(event);
      this.setState({ event });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.event.name) {
      return (
        <div className="container p-5">
          <h1 className="display-4">{this.state.event.name}</h1>
          <img
            className="display-4 pb-2 featuredImage"
            src={this.state.event.thumbnail_image_link}
          />
          <h3>Time:</h3>
          <p className="lead">
            <strong>From:</strong> {this.state.event.start_time}{" "}
            <strong>until</strong> {this.state.event.end_time}
          </p>
          <h3>Location:</h3>
          <p className="lead">
            {this.state.event.location.address_line_one}{" "}
            {this.state.event.location.city}, {this.state.event.location.state}{" "}
            {this.state.event.location.zip}
          </p>
          <TagList selectedTags={this.state.event.tags} />
          <h3 className="mt-3">Details:</h3>
          <p>{this.state.event.details}</p>
          <button
            className="btn btn-secondary"
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
            <RSVP event={this.state.event} />
            <Link to="/events">
              <button className="btn btn-primary">Go back</button>
            </Link>
          </div>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

export default EventDetailScreen;
