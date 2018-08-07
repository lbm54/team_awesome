import React, { Component } from "react";
import { Link } from "react-router-dom";
import SelectMenu from "../../selectmenu";
import TagList from "../../taglist";
import * as eventsService from "../../../services/events";

class EventListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      searchInput: "",
      searchType: ""
    };

    this.handleSearchTypeCallback = searchType => {
      let type = searchType;
      if (searchType === "Tags") type = "tags";
      else if (searchType === "Location (City)") type = "city";
      else if (searchType === "Event Name") type = "name";
      this.setState({ searchType: type });
    };

    this.handleSearch = search => {
      this.setState({ searchInput: search });
    };

    this.handleSearchSubmit = async () => {
      let events;
      let object = {
        searchInput: this.state.searchInput,
        searchType: this.state.searchType
      };
      if (this.state.searchType === "") {
        events = await eventsService.all();
      } else {
        let response = await fetch(`/api/events/search`, {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        events = await response.json();
      }
      events.forEach(event => {
        event = eventsService.formatEvent(event);
      });
      this.setState({ events: events });
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch("/api/events");
      let events = await response.json();
      events.forEach(event => {
        event = eventsService.formatEvent(event);
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
        <div className="col card p-3 m-3 eventListCard" key={index}>
          <div className="card-header">
            <img
              className="card-img-top"
              src={event.thumbnail_image_link}
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">{event.name}</h3>
            <h5 className="card-subtitle mb-2">From:</h5>{" "}
            <label>{event.start_time}</label>
            <h5 className="card-subtitle mb-2">Until:</h5>{" "}
            <label>{event.end_time}</label>
            <h5>Location:</h5>
            <label>
              {event.location.address_line_one} {event.location.city},{" "}
              {event.location.state} {event.location.zip}
            </label>
            <h5>Description:</h5>
            <p className="card-text">{event.blurb}</p>
            <div className="card-footer bg-light">
              <div className="row">
                <Link to={link} className="btn clickable">
                  More Details
                </Link>
              </div>
              <div className="row mt-3">
                <TagList selectedTags={event.tags} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container center-block eventsListingContainer">
        <div className="eventListingHeader">
          <h1 className="ml-3">Upcoming Events</h1>
        </div>
        <hr />
        <div className="row">
          <input
            className="form-control thinnerInput mx-3"
            id="myInput"
            type="text"
            placeholder="See what's going on near you!"
            onChange={e => this.handleSearch(e.target.value)}
          />
          <SelectMenu
            source={["Event Name", "Location (City)", "Tags"]}
            className="form-control thinnerInput"
            id="searchType"
            placeholder="(Filter)"
            callback={this.handleSearchTypeCallback}
          />
          <button
            className="btn button btn-dark ml-2 mt-0"
            onClick={event => this.handleSearchSubmit(event)}
          >
            Search
          </button>

          <Link to="/events/create" className="btn button clickable ml-2 mt-0">
            Create an Event
          </Link>
        </div>

        <div className="row justify-content-start ml-3" id="eventsList">
          {eventslist}
        </div>
      </div>
    );
  }
}

export default EventListingScreen;
