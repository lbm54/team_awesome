import React, { Component } from "react";

class EventListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch("/api/events");
      let events = await response.json();
      events.forEach(event => {
        event.start_time = event.start_time.replace("T", " ");
        event.end_time = event.end_time.replace("T", " ");
        event.start_time = event.start_time.substr(0, 19);
        event.end_time = event.end_time.substr(0, 19);

        if (!event.thumbnail_image_link)
          event.thumbnail_image_link = `/images/default_event_image.png`;
      });
      this.setState({ events });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let eventslist = this.state.events.map((event, index) => {
      return (
        <div
          className="card p-3 m-5 col-md-4"
          key={index}
          style={{ width: "30rem" }}
        >
          <img
            className="card-img-top"
            src={event.thumbnail_image_link}
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">{event.name}</h4>
            <h5 className="card-subtitle mb-2 text-muted">
              Start Time: {event.start_time}
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              End Time: {event.end_time}
            </h5>
            <p className="card-text">{event.blurb}</p>
            <a href="#" className="btn btn-primary">
              Details
            </a>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <h2>Upcoming Events</h2>
        <div className="row">{eventslist}</div>
      </div>
    );
  }
}

export default EventListingScreen;
