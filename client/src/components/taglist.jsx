// import React, { Component, Fragment } from "react";
import React from "react";

const TagList = props => {
  let backgrounds = [
    "badge badge-primary",
    "badge badge-secondary",
    "badge badge-success",
    "badge badge-danger",
    "badge badge-warning",
    "badge badge-info",
    "badge badge-light",
    "badge badge-dark"
  ];
  let counter = 0;
  let spans;
  if (props.selectedTags && props.selectedTags.length > 0) {
    spans = props.selectedTags.map((tag, index) => {
      return (
        <span
          className={backgrounds[counter++ % 8]}
          style={{ marginRight: "1rem" }}
          key={index}
        >
          {tag.name}
        </span>
      );
    });
  } else {
    spans = "None";
  }

  return <div className={props.className}>Tags: {spans}</div>;
};

export default TagList;
