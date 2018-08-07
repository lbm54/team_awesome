import React, { Component, Fragment } from "react";

class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      options: []
    };

    this.componentDidMount = () => {
      $(`#${this.props.id}`).selectmenu({
        select: option => {
          props.callback(option.target.value);
        }
      });
    };

    this.componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.value !== this.props.value) {
        $(`#${this.props.id}-button .ui-selectmenu-text`).html(this.props.value);
      }
    };
  }

  render() {
    let options = this.props.source.map((option, index) => (
      <option key={index}>{option}</option>
    ));
    return (
      <select className={this.props.className} id={this.props.id}>
        <option>{this.props.placeholder}</option>
        {options}
      </select>
    );
  }
}

export default SelectMenu;
