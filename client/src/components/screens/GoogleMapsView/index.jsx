import React, { Component } from "react";

class GoogleMapsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: ""
    };

    this.setupMap = element => {
      if (!window.google) {
        setTimeout(() => {}, 5000);
      }
      this.setState({
        map: new google.maps.Map(element, {
          center: { lat: 33.543682, lng: -86.779633 },
          zoom: 8
        })
      });
    };

    this.addMarkers = (what, objects) => {
      let geocoder = new google.maps.Geocoder();
      let position = {};
      for (var i = 0; i < objects.length; i++) {
        let location = objects[i].location;
        let name = objects[i].name ? objects[i].name : "Untitled";
        let blurb = objects[i].blurb ? objects[i].blurb : "No description";
        let contentString = `<div><h2>Name: ${name}</h2><h4>Description:</h4><p>${blurb}</p></div>`;
        if (
          location &&
          location.address_line_one &&
          location.city &&
          location.state &&
          location.zip
        ) {
          let address = `${location.address_line_one}, ${location.city}, ${
            location.state
          } ${location.zip}`;
          geocoder.geocode({ address: address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              position["lat"] = results[0].geometry.location.lat();
              position["lng"] = results[0].geometry.location.lng();
            } else {
              alert(
                "Geocode was not successful for the following reason: " + status
              );
            }
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            var marker = new google.maps.Marker({
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
          });
        }
      }
    };

    this.componentDidMount = async () => {
      let groupsRaw = await fetch("/api/groups");
      let groups = await groupsRaw.json();
      let eventsRaw = await fetch("/api/events");
      let events = await eventsRaw.json();
      this.addMarkers("groups", groups);
      this.addMarkers("events", events);
    };
  }

  render() {
    return (
      <div className="container fullScreen">
        <h1>Google Map</h1>
        <h4>(Groups are in Blue Events, Green)</h4>
        <div id="map" className="container googleMap" ref={this.setupMap} />
      </div>
    );
  }
}

export default GoogleMapsView;
