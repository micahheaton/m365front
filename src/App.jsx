import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { ReactComponent as Bluevoyant } from "./assets/bluevoyant.svg";
import { ReactComponent as CloudUpload } from "./assets/cloud-upload.svg";
import { ReactComponent as ArrowLeft } from "./assets/arrow-left.svg";
import RcmdActions from "./components/RcmdActions";
import HighImpactRcmdActions from "./components/HighImpactRcmdActions";
import { useEffect } from "react";
import BottomSection from "./components/BottomSection";
import ModalAverage from "./components/ModalAverage";

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [ra, setRa] = useState({ achieved: 0, total: 0 });
  const [hra, setHra] = useState({ achieved: 0, total: 0 });
  const [weigtedResult, setWeightedResult] = useState(0);
  const calculateWeightenedPercentage = () => {
    setWeightedResult((ra.achieved / ra.total) * 0.25) +
      (hra.achieved / hra.total) * 0.75;
  };

  useEffect(() => {
    calculateWeightenedPercentage();
  }, [ra, hra]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("input_file", file);

    try {
      const res = await axios.post(
        "https://bluebackend-ttbv.onrender.com/filter-data",
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
      <div className="navbar justify-between">
        <div style={{ flex: 1 }} className="logo">
          <Bluevoyant />
        </div>
        <p style={{ flex: 4, textAlign: "center" }} className="nav-title">
          BlueVoyant Best Practice Configuration
        </p>
        <div style={{ flex: 1 }}></div>
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
          <div className="flex-row justify-between mb-20">
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
            <div
              className="avg-btn"
              onClick={() => {
                setOpen(true);
              }}
            >
              Display Average
            </div>
          </div>
          <ModalAverage
            open={open}
            setOpen={setOpen}
            weigtedResult={weigtedResult}
          />
          <div className="recom-action-wrapper">
            {/******** Recommended Actions ****** */}
            <RcmdActions setRa={setRa} fuld={data.recommended} />
            {/******** High Impact Recommended Actions ****** */}
            <HighImpactRcmdActions setHra={setHra} fuld={data.highImpact} />
          </div>
        </div>
      )}
      {data && (
        <BottomSection data={[...data.highImpact, ...data.recommended]} />
      )}
    </div>
  );
}

export default App;
