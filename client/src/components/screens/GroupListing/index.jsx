import React, { Component } from "react";
import { Link } from "react-router-dom";
import SelectMenu from "../../selectmenu";
import TagList from "../../taglist";
import * as groupsService from "../../../services/groups";

class GroupListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      searchInput: "",
      searchType: ""
    };

    this.handleSearchTypeCallback = searchType => {
      let type = searchType;
      if (searchType === "Location (City)") type = "city";
      else if (searchType === "Group Name") type = "name";
      else if (searchType === "Tags") type = "tags";
      this.setState({ searchType: type });
    };

    this.handleSearch = search => {
      this.setState({ searchInput: search });
    };

    this.handleSearchSubmit = async () => {
      let groups;
      let object = {
        searchInput: this.state.searchInput,
        searchType: this.state.searchType
      };
      if (this.state.searchType === "") {
        groups = await groupsService.all();
      } else {
        let response = await fetch(`/api/groups/search`, {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        groups = await response.json();
      }

      groups.forEach(group => {
        if (!group.thumbnail_image_link)
          group.thumbnail_image_link = `/images/default_group_image.jpg`;
      });
      this.setState({ groups: groups });
    };
  }

  async componentDidMount() {
    try {
      let groups = await groupsService.all();
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
      let link = `/groups/detail/${group.id}`;
      return (
        <div className="col card p-3 m-3 eventCard" key={index}>
          <div className="card-header bg-white">
            <img
              className="card-img-top"
              src={group.thumbnail_image_link}
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">{group.name}</h3>
            <h5 className="card-subtitle mb-2">Regular Meeting Time</h5>
            <h5 className="card-subtitle mb-2">
              From: {group.regular_event_start_time} until{" "}
              {group.regular_event_end_time}
            </h5>
            <h5>Regular Meeting Location:</h5>
            <label>
              {group.location.address_line_one} {group.location.city},{" "}
              {group.location.state} {group.location.zip}
            </label>
            <h5>Description:</h5>
            <p className="card-text">{group.blurb}</p>
            <div className="card-footer bg-white">
              <div className="row justify-content-between">
                <Link to={link} className="btn btn-primary">
                  More Details
                </Link>
                <TagList selectedTags={group.tags} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container center-block">
        <h2>Groups</h2>

        <div className="row ml-3 mr-3">

          <input
            className="form-control thinnerInput mx-3"
            id="myInput"
            type="text"
            placeholder="Search..."
            onChange={e => this.handleSearch(e.target.value)}
          />
          <SelectMenu
            source={["Group Name", "Location (City)", "Tags"]}
            className="form-control thinnerInput"
            id="searchType"
            callback={this.handleSearchTypeCallback}
          />

          <button
            className="btn btn-dark ml-2 mt-0"
            onClick={event => this.handleSearchSubmit(event)}
          >
            Search
          </button>

          <Link to="/groups/create" className="btn clickable ml-2 mt-0">
            Create a Group
          </Link>
        </div>

        <div className="row" id="groupsList">
          {groupslist}
        </div>

      </div>
    );
  }
}

export default GroupListingScreen;
