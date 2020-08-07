import React, { useState, useEffect } from "react";

import FileChain from "./FileChain";
import FileUploader from "./FileUploader";
import FileInfo from "./FileInfo";
import { Jumbotron, Button, Row, Col } from "react-bootstrap";

import api from "../helpers/api";
import PropTypes from "prop-types";
import { useAuth } from "../auth";
import { toast } from "react-toastify";

const MAX_BLOCKS = 15;

const Upload = () => {
  const [blockFiles, setBlockFiles] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [balance, setBalance] = useState({});
  const { hasAuth } = useAuth();

  const goToDashboard = () => (window.location.href = "/");

  if (!hasAuth) {
    goToDashboard();
  }

  useEffect(() => {
    const getDocs = async () => {
      setLoading(true);
      try {
        const res = await api.getDocuments();
        const { data } = res;
        console.log("docs", data);
        setBlockFiles(data);
      } catch (e) {
        console.error("error getting documents", e);
        const msg = `Could not fetch documents. ${api.getErrorMessage(e)}`;
        toast.error(msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
      setLoading(false);
    };

    getDocs();
  }, []);

  function addBlocks(blocks) {
    setBlockFiles(blockFiles.concat(blocks));
  }

  if (!hasAuth) {
    return null;
  }

  if (!!selectedFile) {
    return (
      <div>
        <Button onClick={() => setSelectedFile(null)}>Go back</Button>
        <FileInfo selectedFile={selectedFile} />
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="header-row">Your Documents</div>

      <Row className="show-grid">
        <Col xs={12} md={5}>
          <FileUploader addBlocks={(blocks) => addBlocks(blocks)} />
        </Col>
        <Col xs={12} md={7}>
          <FileChain
            loading={loading}
            blockFiles={blockFiles}
            setSelectedFile={setSelectedFile}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Upload;
