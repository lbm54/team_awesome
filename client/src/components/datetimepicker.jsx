import React, { Component } from "react";

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.makeDateTimePicker = element => {
      $(element).datetimepicker({
        onSelect: dateText => {
          this.props.onChange(dateText);
        },
        timeFormat: "HH:mm:ss",
        dateFormat: "yy-mm-dd"
      });
    };
  }

  render() {
    return (
        <input ref={this.makeDateTimePicker} value={this.props.value} className={this.props.className} type="text" name={this.props.name} />
    );
  }
}

export default DateTimePicker;
