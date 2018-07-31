import React, { Component } from "react";
import { Link } from "react-router-dom";

class GroupListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch("/api/groups");
      let groups = await response.json();
      groups.forEach(group => {
        if (!group.thumbnail_image_link)
          group.thumbnail_image_link = `/images/default_group_image.jpg`;
      });
      this.setState({ groups });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let groupslist = this.state.groups.map((group, index) => {
      let link = `/groups/${group.id}`;
      return (
        <div
          className="card p-3 m-5 col-md-4"
          key={index}
          style={{ width: "30rem" }}
        >
          <img className="card-img-top" src={group.thumbnail_image_link} />
          <div className="card-body">
            <h4 className="card-title">{group.name}</h4>
            <h5 className="card-subtitle mb-2 text-muted">
              Meets on: {group.regular_event_day_of_week}
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              Starting at: {group.regular_event_start_time}
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              Ending at: {group.regular_event_end_time}
            </h5>
            <p className="card-text">{group.blurb}</p>
            <Link to={link} className="btn btn-primary">
              Details
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className="container fullScreen">
        <h2>Groups</h2>
        <div className="row">{groupslist}</div>
      </div>
    );
  }
}

export default GroupListingScreen;
