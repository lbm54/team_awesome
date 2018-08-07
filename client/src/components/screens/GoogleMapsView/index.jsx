import React, { Component } from "react";

class GoogleMapsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: "",
      groups: [],
      events: []
    };

    this.setupMap = element => {
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
      this.state.map.setCenter(this.state[what][index].position);
    };

    this.addMarkers = what => {
      for (var i = 0; i < this.state[what].length; i++) {
        let object = this.state[what][i];
        let location = object.location;
        let name = object.name ? object.name : "Untitled";
        let blurb = object.blurb ? object.blurb : "No description";
        let contentString = `<div><h2>Name: ${name}</h2><h4>Description:</h4><p>${blurb}</p></div>`;
        if (
          location &&
          location.address_line_one &&
          location.city &&
          location.state &&
          location.zip
        ) {
          object.position = {};
          if (object.location.lat && object.location.lng) {
            object.position["lat"] = object.location.lat;
            object.position["lng"] = object.location.lng;
          }
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          var marker = new google.maps.Marker({
            position: object.position,
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
      let groupsRaw = await fetch("/api/groups");
      let groups = await groupsRaw.json();
      this.setState({ groups });
      let eventsRaw = await fetch("/api/events");
      let events = await eventsRaw.json();
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
            this.handleListClick("groups", index);
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
          className="list-group-item list-group-item-action googleLists"
          onClick={e => {
            this.handleListClick("events", index);
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
