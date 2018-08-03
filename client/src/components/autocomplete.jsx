import React, { Component } from "react";

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.source !== this.props.source) {
        let formatted = this.props.source.map(item => {
          if (item.name && item.id) return { text: item.name, id: item.id };
        });
        $(`#${this.props.id}`)
          .select2({
            width: "40%",
            minimumInputLength: 1,
            data: formatted,
            formatResult: item => item.name
          })
          .on("select2:select", e => {
            this.props.callback({
              id: e.target.value,
              name: $(`#${this.props.id} option:selected`).text()
            });
          });
      }
    };
  }

  render() {
    return (
      <select className={this.props.className} id={this.props.id}>
        <option />
      </select>
    );
  }
}

export default AutoComplete;
