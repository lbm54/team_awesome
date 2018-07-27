import React, { Component } from "react";

class EventListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventslist: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch("/api/events");
      let data = await response.json();
      console.log(data);
      this.setState({ eventslist: data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let eventslist = this.state.eventslist.map((events, index) => {
      return (
        <div className="card" key={index}>
          <img
            className="card-img-top"
            src="../../images/website4.jpg"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{events.name}</h5>
            <p className="card-text">
              {events.start_time}
              {events.end_time}
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      );
    });

    return <div>{eventslist}</div>;
  }
}

export default EventListingScreen;
