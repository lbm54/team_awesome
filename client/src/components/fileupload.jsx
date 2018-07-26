import React, { Component, Fragment } from "react";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      imageSrc: ""
    };

    this.submitImage = async event => {
      event.preventDefault();
      try {
        let data = new FormData();
        data.append("file", this.fileInput.files[0]);
        let responseRaw = await fetch("/api/upload", {
          method: "POST",
          body: data
        });
        let response = await responseRaw.json();
        this.setState({
          successMessage: "File uploaded successfully!",
          imageSrc: `/images/${response.name}`
        });
      } catch (err) {
        this.setState({ errorMessage: "Error uploading file" });
      }
    };
  }

  render() {
    let response = [
      <div className="form-group" key="response">
        <input ref={ref => (this.fileInput = ref)} type="file" name="file" />
        <button
          className="btn btn-primary"
          onClick={event => this.submitImage(event)}
        >
          Upload
        </button>
        <div>
          <span className="badge badge-danger">{this.state.errorMessage}</span>
          <span className="badge badge-success">
            {this.state.successMessage}
          </span>
        </div>
      </div>
    ];
    if (this.state.imageSrc)
      response.push(
        <div key="imagePreview">
          <p>Your image preview: </p>
          <img
            src={this.state.imageSrc}
            className="thumbnailImage"
          />
        </div>
      );
    return <Fragment>{response}</Fragment>;
  }
}

export default FileUpload;
