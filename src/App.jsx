import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactSelect from "react-select";
import Papa from "papaparse";
import { ReactComponent as CloudUpload } from "./assets/cloud-upload.svg";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedNavOption, setSelectedNavOption] = useState("");

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (selectedNavOption == "") {
      alert("please select a display option");
    } else if (!file) {
      alert("please upload a file");
    } else {
      if (selectedNavOption == "/device-risk") {
        console.log("device risk");
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            results.data.forEach((obj) => {
              delete obj["Device ID"];
              delete obj["Device Name"];
              delete obj["Domain"];
              delete obj["Tags"];
              delete obj["Group"];
              delete obj["Device IPs"];
            });
            setData(results.data);
          },
        });
      } else {
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
          if (res.status === 200 || res.status === 201) {
            setData(res.data);
          }
        } catch (err) {
          console.error(err);
          alert("something went wrong");
        }
      }
    }
  };

  useEffect(() => {
    if (data) {
      navigate(selectedNavOption, { state: data });
    }
  }, [data]);

  const onNavigationOptionChange = (e) => {
    setSelectedNavOption(e.value);
  };

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
            onChange={(e) => setFile(e.target.files[0])}
            accept=".csv"
            hidden
          />
        </div>
      </div>
    </div>
  );
}

export default App;
