import React, { Component } from "react";
import { Link } from "react-router-dom";
import SelectMenu from "../../selectmenu";

class EventListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      searchInput: "",
      searchType: ""
    };

    this.handleSearchTypeCallback = searchType => {
      this.setState({ searchType });
    };

    this.handleSearch = (search) => {
      this.setState({searchInput: search})
    }

    // this.handleSearchSubmit = (event) => {
    //   let response = await fetch("/api/")
    // }
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
      let link = `/events/detail/${event.id}`;
      return (
        <div className="col card p-3 m-3 eventCard" key={index}>
          <div className="card-header bg-white">
            <img
              className="card-img-top"
              src={event.thumbnail_image_link}
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">{event.name}</h4>
            <h5 className="card-subtitle mb-2 text-muted">
              Start Time: {event.start_time}
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              End Time: {event.end_time}
            </h5>
            <p className="card-text">{event.blurb}</p>
            <div className="card-footer bg-white">
              <Link to={link} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid fullScreen">
        <h2>Upcoming Events</h2>
        <div className="row">
          <input
            className="form-control thinnerInput mx-3"
            id="myInput"
            type="text"
            placeholder="Search..."
            onChange={e => this.handleSearch(e.target.value)}
          />
          <SelectMenu
            source={["By Name", "By Location"]}
            className="form-control thinnerInput"
            id="searchType"
            callback={this.handleSearchTypeCallback}
          />
          <button className="btn btn-primary ml-2 mt-0" onClick={(event) => this.handleSearchSubmit(event)}>Search</button>
        </div>
        <div className="row" id="eventsList">
          {eventslist}
        </div>
      </div>
    );
  }
}

export default EventListingScreen;
