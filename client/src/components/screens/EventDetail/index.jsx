import React, { Component } from "react";

class EventDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.eventId = props.match.params.id;


    this.state = {
      event: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch(`/api/events/${this.eventId}`);
      let event = await response.json();
      event.start_time = event.start_time.replace("T", " ");
      event.end_time = event.end_time.replace("T", " ");
      event.start_time = event.start_time.substr(0, 19);
      event.end_time = event.end_time.substr(0, 19);

      if (!event.thumbnail_image_link)
        event.thumbnail_image_link = `/images/default_event_image.png`;
      this.setState({ event });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid p-5">
        <h1 className="display-4">{this.state.event.name}</h1>
        <img className="display-4 pb-2" style={{"width": "50%", "height": "500px"}} src={this.state.event.thumbnail_image_link} />
        <p className="lead">Start Time: {this.state.event.start_time}</p>
        <p className="lead">End Time: {this.state.event.end_time}</p>
        <hr className="my-4" />
        <p>{this.state.event.details}</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Go back
          </a>
        </p>
      </div>
    );
  }
}

export default EventDetailScreen;
