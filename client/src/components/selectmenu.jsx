import React, { Component, Fragment } from "react";

class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      options: []
    };

    this.componentDidMount = (prevProps, prevState) => {
      $(`#${this.props.id}`).selectmenu({
        select: option => {
          this.props.callback(option);
        }
          
      })
    };
  }

  render() {
    let options = this.props.source.map((option, index) => <option key={index}>{option}</option>);
    return (
      <select className={this.props.className} id={this.props.id}>
      <option />
        {options}
      </select>
    );
  }
}

export default SelectMenu;
