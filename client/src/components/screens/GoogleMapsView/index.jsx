import React, { Component } from "react";
import * as groupsService from "../../../services/groups";
import * as eventsService from "../../../services/events";

class GoogleMapsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: "",
      groups: [],
      events: []
    };

    this.setupMap = element => {
      if (this.state.map) return;
      if (!window.google) {
        setTimeout(() => {}, 5000);
      }
      this.setState({
        map: new google.maps.Map(element, {
          center: { lat: 33.543682, lng: -86.779633 },
          zoom: 11
        })
      });
    };

    this.handleListClick = (what, index) => {
      let position = {
        lat: parseFloat(this.state[what][index].location.lat),
        lng: parseFloat(this.state[what][index].location.lng)
      }
      this.state.map.setCenter(position);
    };

    this.addMarkers = what => {
      for (var i = 0; i < this.state[what].length; i++) {
        let object = this.state[what][i];
        let location = object.location;
        let name = object.name ? object.name : "Untitled";
        let blurb = object.blurb ? object.blurb : "No description";
        let contentString = `<div><h2>Name: ${name}</h2><h4>Description:</h4><p>${blurb}</p></div>`;
        if (location.lat && location.lng) {
          let position = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) };
          let infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          let marker = new google.maps.Marker({
            position,
            map: this.state.map,
            icon:
              what === "events"
                ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });
          marker.addListener("click", function() {
            infowindow.open(map, marker);
          });
        }
      }
    };

    this.componentDidMount = async () => {
      let groups = await groupsService.all();
      this.setState({ groups });
      let events = await eventsService.all();
      this.setState({ events });
      this.addMarkers("groups");
      this.addMarkers("events");
    };
  }

  render() {
    let events = this.state.events.map((event, index) => {
      return (
        <li
          key={index}
          id={event.id}
          className="list-group-item list-group-item-action"
          onClick={e => {
            this.handleListClick("events", index);
          }}
        >
          {event.name}
        </li>
      );
    });
    let groups = this.state.groups.map((group, index) => {
      return (
        <li
          key={index}
          id={group.id}
          className="list-group-item list-group-item-action"
          onClick={(e) => {
            this.handleListClick("groups", index);
          }}
        >
          {group.name}
        </li>
      );
    });
    return (
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-xs-3 p-3">
            <h2>Events</h2>
            <ul className="list-group googleLists">{events}</ul>
          </div>
          <div className="col-xs-3 p-3">
            <h2>Groups</h2>
            <ul className="list-group googleLists">{groups}</ul>
          </div>
          <div className="col-xs-6">
            <div
              id="map"
              className="col-xs-6 googleMap p-2"
              ref={this.setupMap}
            />
          </div>
        </div>z
      </div>
    );
  }
}

export default GoogleMapsView;
