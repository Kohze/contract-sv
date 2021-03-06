import React from "react";
import History from "./History";
import createReactClass from "create-react-class";
import api from "../helpers/api";
import Loader from "react-loader-spinner";
import { Button, Modal } from "react-bootstrap";
import FileUploader from "./FileUploader";

const FileInfo = createReactClass({
  async getDocs() {
    const filename = this.props.selectedFile.name;

    try {
      const res = await api.getHistory(filename);
      const { data } = res;
      this.setState({
        loading: false,
        versions: data,
      });
      console.log("versions", data);
    } catch (e) {
      console.error("error loading documents", e);
    }
  },

  componentWillMount() {
    this.setState({
      loading: true,
      versions: null,
      filterMatches: false,
      showModal: false,
      compare: false,
      matching: false,
      currentHash: null,
    });

    this.getDocs();
  },

  handleCompareClicked(event) {
    this.setState({
      showModal: true,
      compare: true,
    });
  },

  handleUploadClicked(event) {
    this.setState({
      showModal: true,
      compare: false,
    });
  },

  handleFileUploaded(results) {
    if (this.state.compare) {
      this.setState({
        showModal: false,
        compare: false,
        matching: true,
        currentHash: results.length > 0 ? results[0].hash : null,
      });
    } else {
      this.setState({
        showModal: false,
        matching: null,
        currentHash: null,
      });
      this.getDocs();
    }
  },

  setShowModal(show) {
    this.setState({
      showModal: show,
    });
  },

  render() {
    const {
      versions,
      currentHash,
      loading,
      showModal,
      compare,
      matching,
    } = this.state;
    const { selectedFile } = this.props;
    return (
      <div className="file-info-page">
        <hr />
        <h3>
          Upload history for <b>{selectedFile.name}</b>
        </h3>
        <p>To upload or compare a new document it must have the same name.</p>
        <hr />
        {loading && (
          <Loader type="ThreeDots" color="#007bff" height="50" width="50" />
        )}
        {!loading && (
          <div>
            <Button onClick={this.handleUploadClicked}>
              Upload new version
            </Button>
            &nbsp;
            <Button onClick={this.handleCompareClicked}>
              Compare existing document
            </Button>
            <Modal show={showModal} onHide={() => this.setShowModal(false)}>
              <Modal.Body>
                <FileUploader
                  successCallback={this.handleFileUploaded}
                  compare={compare}
                  enforceName={selectedFile.name}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  bsStyle="danger"
                  onClick={() => this.setShowModal(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <History
              versions={versions}
              currentHash={currentHash}
              matching={matching}
            />
          </div>
        )}
      </div>
    );
  },
});

export default FileInfo;
