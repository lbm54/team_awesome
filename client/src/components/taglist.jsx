// import React, { Component, Fragment } from "react";
import React from "react";

const TagList = props => {
  let spans = props.selectedTags.map((tag, index) => {
    return <span className="bg-primary" key={index}>{tag.name}</span>;
  })

  return (
    <div>{spans}</div>
  );
};

export default TagList;
