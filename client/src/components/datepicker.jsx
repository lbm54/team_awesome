import React, { Component, Fragment } from "react";

class DatePicker extends Component {
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
        <input ref={this.makeDatePicker} className={this.props.className} type="text" name={this.props.name} />
    );
  }
}

export default DatePicker;
