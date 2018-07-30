import React, { Component } from "react";
import Comment from "../../comments/Comment";

class GroupDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.groupId = props.match.params.id;


    this.state = {
      group: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch(`/api/groups/${this.groupId}`);
      let group = await response.json();

      if (!group.thumbnail_image_link)
      group.thumbnail_image_link = `/images/default_group_image.jpg`;
      this.setState({ group });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid p-5">
        <h1 className="display-4">{this.state.group.name}</h1>
        <img className="display-4 pb-2" style={{"width": "50%", "height": "500px"}} src={this.state.group.thumbnail_image_link} />
        <p className="lead">Regular Event Start Time: {this.state.group.regular_event_start_time}</p>
        <p className="lead">Regular Event End Time: {this.state.group.regular_event_end_time}</p>
        <p className="lead">Regular Event Day of Week: {this.state.group.regular_event_day_of_week}</p>
        <hr className="my-4" />
        <p>{this.state.group.details}</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Go back
          </a>
        </p>
        <Comment comments={this.state.group.comments} />
      </div>
    );
  }
}

export default GroupDetailScreen;
