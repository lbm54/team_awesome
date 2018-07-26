// import React, { Component, Fragment } from "react";
import React from "react";

const AutoComplete = props => {
  let source = [];
  let placeholder;
  if (props.source.length === 0) placeholder = "loading...";
  let makeAutoComplete = element =>
    $(element).autocomplete({
      source: source,
      change: (event) => props.onChange(event.target.value)
    });

  for (var i = 0; i < props.source.length; i++) {
    if (props.source[i].name) source.push(props.source[i].name);
  }

  return (
    <input
      ref={makeAutoComplete}
      className={props.className}
      type="text"
      placeholder={placeholder}
      name={props.name}
    />
  );
};

export default AutoComplete;
