// import React, { Component, Fragment } from "react";
import React from "react";
let counter = 0;
const AutoComplete = props => {
  let makeAutoComplete = element => {
    if (counter === 0) {
      $(element)
        .select2({
          width: "40%",
          allowClear: true,
          multiple: true,
          minimumInputLength: 1,
        })
        .on("select2:select", e => {
          if (!(e.target.value)) return;
          props.callback(e.target.value);
        });
        $(element).val(null);
        $('.select2-selection__rendered').html('');
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
      <select
        className={props.className}
        ref={makeAutoComplete}
        multiple
      >
        {options}
      </select>
    );
  } else return <p>Loading...</p>;
};

export default AutoComplete;
