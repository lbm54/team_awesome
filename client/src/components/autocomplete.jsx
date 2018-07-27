// import React, { Component, Fragment } from "react";
import React from "react";
let counter = 0;
const AutoComplete = props => {
  let makeAutoComplete = element => {
    if (counter === 0) {
      $(element)
        .select2({
          width: "40%",
          minimumInputLength: 1
        })
        .on("select2:select", e => {
          if (!e.target.value) return;
          props.callback(e.target.value);
        });
    }
    counter++;
  };

  let options = props.source.map((option, index) => {
    if (option.name) {
      return (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      );
    }
  });
  if (options.length > 0) {
    return (
      <select className={props.className} ref={makeAutoComplete}>
      <option></option>
        {options}
      </select>
    );
  } else return <p>Loading...</p>;
};

export default AutoComplete;
