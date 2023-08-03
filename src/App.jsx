// Import necessary dependencies
import React, { useState, useEffect } from "react";
import "./App.css";
import ReactSelect from "react-select";
import Papa from "papaparse";
import { ReactComponent as CloudUpload } from "./assets/cloud-upload.svg";
import { useNavigate } from "react-router-dom";
import ModelRecommendedACtions from "./utils/ModelRecommendedActions";

function App() {
  // Create and initialise state variables
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [deviceRiskFile, setDeviceRiskFile] = useState(null);
  const [selectedNavOption, setSelectedNavOption] = useState("");

  // Function to handle file uploads and parse data
  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Check for correct selection and file upload
    if (selectedNavOption == "") {
      alert("please select a display option");
    } else if (
      (selectedNavOption == "/recommended-actions" && !file) ||
      (selectedNavOption == "/device-risk" && (!file || !deviceRiskFile))
    ) {
      alert("please upload required file(s)");
    } else {
      // Process the uploaded files
      if (selectedNavOption == "/device-risk") {
        Papa.parse(deviceRiskFile, {
          header: true,
          complete: async (results) => {
            // Remove unnecessary fields
            results.data.forEach((obj) => {
              delete obj["Device ID"];
              delete obj["Device Name"];
              delete obj["Domain"];
              delete obj["Tags"];
              delete obj["Group"];
              delete obj["Device IPs"];
            });
            // Process file data using the imported model
            const res = await ModelRecommendedACtions(file);
            setData({
              deviceRiskData: results.data,
              recommendedActionsData: res,
            });
          },
        });
      } else {
        try {
          // Process file data using the imported model
          const res = await ModelRecommendedACtions(file);
          setData({ recommendedActionsData: res });
        } catch (err) {
          console.error(err);
          alert("something went wrong");
        }
      }
    }
  };

  // Use effect to navigate to the selected page after data is set
  useEffect(() => {
    if (data) {
      navigate(selectedNavOption, { state: data });
    }
  }, [data]);

  // Function to handle navigation option change
  const onNavigationOptionChange = (e) => {
    setSelectedNavOption(e.value);
  };

  // Navigation options
  const navigationOptions = [
    { value: "/recommended-actions", label: "Recommended Actions" },
    { value: "/device-risk", label: "Device Risk" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      // borderColor: "#35517b",
      minHeight: "40px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0px 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "100%",
    }),
  };

  return (
    <div className="App">
      <div className="file-input-wrapper">
        <div className="file-input-content">
          <div className="mb-20 w-full h-full">
            <label>Select display option:</label>
            <div
              style={{ gap: "0.5rem" }}
              className="flex-row align-center justify-center"
            >
              <ReactSelect
                className="w-full h-full"
                options={navigationOptions}
                onChange={onNavigationOptionChange}
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={customStyles}
              />
              <button
                className="button-79"
                role="button"
                onClick={handleFileUpload}
              >
                Submit
              </button>
            </div>
          </div>
          {selectedNavOption == "/recommended-actions" ? (
            <>
              <p className="file-input-header">Upload your file:</p>
              <label htmlFor="file-input" className="file-input">
                <p
                  style={{
                    textAlign: "center",
                    color: file ? "var(--color-obsidian)" : "",
                  }}
                  className="title"
                >
                  {file ? file.name : "Browse file to upload"}
                </p>
                <CloudUpload className="cloud-upload-icon" />
                <p className="subtitle">Supported files</p>
                <p className="ext">CSV file</p>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".csv"
                hidden
              />
            </>
          ) : selectedNavOption == "/device-risk" ? (
            <>
              <p className="file-input-header">Upload your files:</p>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <label htmlFor="file-input" className="file-input">
                  <p
                    style={{
                      color: file ? "var(--color-obsidian)" : "",
                    }}
                    className="title"
                  >
                    {file ? file.name : "Browse file to upload"}
                  </p>
                  <CloudUpload className="cloud-upload-icon" />
                  <p className="subtitle">Supported files</p>
                  <p className="ext">CSV file</p>
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".csv"
                  hidden
                />
                <label htmlFor="device-file-input" className="file-input">
                  <p
                    style={{
                      color: deviceRiskFile ? "var(--color-obsidian)" : "",
                    }}
                    className="title"
                  >
                    {deviceRiskFile
                      ? deviceRiskFile.name
                      : "Browse file to upload"}
                  </p>
                  <CloudUpload className="cloud-upload-icon" />
                  <p className="subtitle">Supported files</p>
                  <p className="ext">CSV file</p>
                </label>
                <input
                  id="device-file-input"
                  type="file"
                  onChange={(e) => setDeviceRiskFile(e.target.files[0])}
                  accept=".csv"
                  hidden
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
