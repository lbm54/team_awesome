import React, { Component, Fragment } from "react";

class datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.makeDatePicker = element => {
      $(element).datepicker({
        onSelect: dateText => {
          this.props.onChange(dateText);
        }
      });
    };
  }

  render() {
    return (
      <p>
        {this.props.text}: <input ref={this.makeDatePicker} type="text" />
      </p>
    );
  }
}

export default datepicker;
