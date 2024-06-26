import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExposureBreakdown from "./device-risk/ExposureBreakdown";
import BarChartDeviceRisk from "./device-risk/BarChartDeviceRisk";
import CircleChartDeviceRisk from "./device-risk/CircleChartDeviceRisk";
import Papa from "papaparse";
import { ReactComponent as ExportCSVIcon } from "../assets/export-csv.svg";

import { modelDevices } from "../utils/ModelDevices";
import RisksFilter from "./device-risk/RisksFilter";
import RecommendedActions from "./RecommendedActions";

export default function DeviceRisk() {
  const { state } = useLocation();
  const { deviceRiskData, recommendedActionsData } = state;
  const [csvUrl, setCsvUrl] = useState(null);
  useEffect(() => {
    const csvString = Papa.unparse(deviceRiskData);
    const csvData = new Blob([csvString], { type: "text/csv;charset=utf-8," });
    setCsvUrl(URL.createObjectURL(csvData));
  }, []);

  const navigate = useNavigate();
  const [filteredArrList, setFilteredArrList] = useState(deviceRiskData);
  const [filteredData, setFilteredData] = useState(null);
  const [filteredInitialData, setFilteredInitialData] = useState(null);

  /*   *******************************************************************  */

  const [filteredByRisk, setFilteredByRisk] = useState(null);
  const [filteredByManaged, setFilteredByManaged] = useState(null);
  const [filteredByOsPlatform, setFilteredByOsPlatform] = useState(null);
  const [filteredByExposure, setFilteredByExposure] = useState(null);
  const [filteredByHealthStatus, setFilteredByHealthStatus] = useState(null);
  const [filteredByAntiVirus, setFilteredByAntiVirus] = useState(null);

  /*   *******************************************************************  */

  useEffect(() => {
    if (deviceRiskData !== null) {
      const dat = modelDevices(deviceRiskData);
      setFilteredData(dat);
      setFilteredInitialData(dat);
    } else {
      navigate("/");
    }
  }, []);

  function calculateData(arr) {
    setFilteredData(modelDevices(arr));
  }

  useEffect(() => {
    calculateData(filteredArrList);
  }, [filteredArrList]);

  const resetFilters = () => {
    setFilteredByRisk(null);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData);
  };
  const filterByManaged = (name) => {
    setFilteredByRisk(null);
    setFilteredByManaged(name);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData.filter((el) => el["Managed By"] === name));
  };
  const filterByRisks = (name) => {
    setFilteredByRisk(name);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData.filter((el) => el["Risk Level"] === name));
  };
  const filterByOsPlatform = (name) => {
    setFilteredByRisk(null);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(name);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData.filter((el) => el["OS Platform"] === name));
  };
  const filterByExposure = (name) => {
    setFilteredByRisk(null);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(name);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData.filter((el) => el["Exposure Level"] === name));
  };
  const filterByHealthStatus = (name) => {
    setFilteredByRisk(null);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(name);
    setFilteredByAntiVirus(null);
    calculateData(deviceRiskData.filter((el) => el["Health Status"] === name));
  };
  const filterByAntiVirus = (name) => {
    setFilteredByRisk(null);
    setFilteredByManaged(null);
    setFilteredByOsPlatform(null);
    setFilteredByExposure(null);
    setFilteredByHealthStatus(null);
    setFilteredByAntiVirus(name);
    calculateData(
      deviceRiskData.filter((el) => el["Antivirus status"] === name)
    );
  };
  return (
    filteredData && (
      <>
        <RecommendedActions
          recommendedActionsDataProp={recommendedActionsData}
        />
        <div className="recom-action-container">
          <div style={{alignItems:"center"}} className="flex-row justify-between mb-20">
            <div className="title">Device Risk</div>
            <div className="flex-row gap-20">
              <div
                onClick={() => resetFilters()}
                style={{ backgroundColor: "#0000ff" }}
                className="export-btn"
              >
                <span style={{ marginLeft: "8px" }}>Reset Filters</span>
              </div>
              <a href={csvUrl} className="export-btn">
                <ExportCSVIcon style={{ width: "24px", height: "24px" }} />
                <span style={{ marginLeft: "8px" }}>Export Data</span>
              </a>
            </div>
          </div>
          {/********************************************** */}

          <RisksFilter
            data={filteredByRisk ? filteredInitialData : filteredData}
            filteredByRisk={filteredByRisk}
            filterByRisks={filterByRisks}
          />
          {/********************************************** */}
          <div>
            <BarChartDeviceRisk
              filterManagedBy={filterByManaged}
              filteredByManaged={filteredByManaged}
              filterByOsPlatform={filterByOsPlatform}
              filteredByOsPlatform={filteredByOsPlatform}
              managedByData={
                filteredByManaged
                  ? filteredInitialData.managedBy
                  : filteredData.managedBy
              }
              osPlatformData={
                filteredByOsPlatform
                  ? filteredInitialData.osPlatform
                  : filteredData.osPlatform
              }
            />
            <ExposureBreakdown
              filterByExposure={filterByExposure}
              filteredByExposure={filteredByExposure}
              data={
                filteredByExposure
                  ? filteredInitialData.exposures
                  : filteredData.exposures
              }
            />
            <CircleChartDeviceRisk
              filterByHealthStatus={filterByHealthStatus}
              filteredByHealthStatus={filteredByHealthStatus}
              filterByAntiVirus={filterByAntiVirus}
              filteredByAntiVirus={filteredByAntiVirus}
              healthData={
                filteredByHealthStatus
                  ? filteredInitialData.healthStatus
                  : filteredData.healthStatus
              }
              statusData={
                filteredByAntiVirus
                  ? filteredInitialData.antiVirus
                  : filteredData.antiVirus
              }
            />
          </div>
        </div>
      </>
    )
  );
}
