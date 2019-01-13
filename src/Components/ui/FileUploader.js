import React, { Component } from "react";
import { firebase } from "../../firebase.js";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";

class Fileuploader extends Component {
  constructor(props) {
    super(props);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.uploadAgain = this.uploadAgain.bind(this);
    this.state = {
      name: "",
      isUploading: false,
      fileURL: ""
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg
      });
    }
    return null;
  }
  handleUploadError() {
    this.setState(() => ({ isUploading: false }));
  }
  handleUploadStart() {
    this.setState(() => ({ isUploading: true }));
  }
  handleUploadSuccess(filename) {
    // console.log(filename);
    this.setState(() => ({
      name: filename,
      isUploading: false
    }));

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // console.log(url)
        this.setState(() => ({ fileURL: url }));
      });

    this.props.filename(filename);
  }
  uploadAgain(){
    this.setState(() => ({
      name: "",
      isUploading: false,
      fileURL: ""
    }));
    this.props.resetImage();
  }
  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0px" }}
          >
            <CircularProgress thickness={5.5} style={{ color: "#903749" }} />
          </div>
        ) : null}
        {this.state.fileURL ? (
          <div className="image_upload_container">
            <img src={this.state.fileURL} alt={this.state.name} />
            <div className="remove" onClick={() => this.uploadAgain()}>
              remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
