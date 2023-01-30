import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { ReactComponent as Bluevoyant } from "./assets/bluevoyant.svg";
import { ReactComponent as CloudUpload } from "./assets/cloud-upload.svg";
import { ReactComponent as ArrowLeft } from "./assets/arrow-left.svg";
import RcmdActions from "./components/RcmdActions";
import HighImpactRcmdActions from "./components/HighImpactRcmdActions";

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("input_file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/filter-data",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">
          <Bluevoyant />
        </div>
        <p className="nav-title">Required Vs. Situation Recommendations</p>
        {/* <div className="profile-icon"></div> */}
      </div>

      {/** *************************************************** */}
      {/** *************************************************** */}
      {/** *************************************************** */}
      {/** *************************************************** */}
      {/** *************************************************** */}
      {data == null && (
        <div className="file-input-wrapper">
          <div className="file-input-content">
            <p className="file-input-header">Upload your file:</p>
            <label htmlFor="file-input" className="file-input">
              <p className="title">Browse file to upload</p>
              <CloudUpload className="cloud-upload-icon" />
              <p className="subtitle">Supported files</p>
              <p className="ext">CSV file</p>
            </label>
            <input
              id="file-input"
              type="file"
              onChange={(e) => handleFileUpload(e)}
              accept=".csv"
              hidden
            />
          </div>
        </div>
      )}
      {data && (
        <div className="recom-action-container">
          <div
            className="breadcrumbs"
            onClick={() => {
              setData(null);
            }}
          >
            <span>
              <ArrowLeft className="breadcrumbs-icon" />
            </span>
            <p className="breadcrumbs-content">Back to upload file</p>
          </div>
          <div className="recom-action-wrapper">
            {/******** Recommended Actions ****** */}
            <RcmdActions fuld={data.recommended} />
            {/******** High Impact Recommended Actions ****** */}
            <HighImpactRcmdActions fuld={data.highImpact} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
