import React, { Component, Fragment } from "react";

class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };

    this.makeSelect = element => {
      $(element).selectmenu({
        onSelect: option => {
          console.log(option);
          // this.props.onChange(option);
        }
      });
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <select ref={this.makeSelect} className={this.props.className} name={this.props.name}>
        <option>Slower</option>
        <option>Slow</option>
        <option selected="selected">Medium</option>
        <option>Fast</option>
        <option>Faster</option>
      </select>
    );
  }
}

export default SelectMenu;
