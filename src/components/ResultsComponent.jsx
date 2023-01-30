import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ModelData } from "../utils/ModelData";
import { useEffect } from "react";

function ResultsComponent({ data }) {
  const [fullData, setFullData] = useState(data);
  const [results, setResults] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [toAddressData, setToAddress] = useState(null);

  function calculateCategoryResults(arr) {
    const res = ModelData(arr);
    return res;
  }

  function calculateResults(arr) {
    const res = ModelData(arr);
    setResults(res);
  }

  function filterByCategory(category) {
    if (filteredData.length > 0) {
      let newArr = [...filteredData].filter((el) => el["Category"] == category);
      setCategoryData({
        category: category,
        data: calculateCategoryResults(newArr),
      });
      setToAddress(null);
    } else {
      let newArr = [...fullData].filter((el) => el["Category"] == category);
      setCategoryData({
        category: category,
        data: calculateCategoryResults(newArr),
      });
      setToAddress(null);
    }
  }
  function filterByToAddress(toAd) {
    if (filteredData.length > 0) {
      let newArr = [...filteredData].filter((el) => el["Status"] == toAd);
      setToAddress({
        toAddress: toAd,
        data: calculateCategoryResults(newArr),
      });
      setCategoryData(null);
    } else {
      let newArr = [...fullData].filter((el) => el["Status"] == toAd);
      setToAddress({
        toAddress: toAd,
        data: calculateCategoryResults(newArr),
      });
      setCategoryData(null);
    }
  }

  function selectedItem(item) {
    setCategoryData(null);
    setToAddress(null);

    if (filteredData.includes(item)) {
      setFilteredData((prev) => prev.filter((el) => el != item));
    } else {
      setFilteredData((prev) => [...prev, item]);
    }
  }

  useEffect(() => {
    const res = ModelData(data);
    setResults(res);
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    filteredData.length != 0
      ? calculateResults(filteredData)
      : calculateResults(fullData);
  }, [filteredData]);

  return (
    <div className="App">
      <p onClick={() => setFilteredData([])}>Select all</p>
      {fullData.map((el,i) => (
        <p
        key={i}
          style={{
            paddingBlock: "10px",
            backgroundColor: filteredData.includes(el)
              ? "yellow"
              : "rgba(100,152,80,0.7)",
            marginBlock: "10px",
          }}
          onClick={() => selectedItem(el)}
        >
          {el["Recommended action"]}--{el["Category"]} --{" "}
          {el["Points achieved"]}
        </p>
      ))}
      {fullData.length == 0 && (
        <input type="file" onChange={(e) => handleFileUpload(e)} />
      )}

      {categoryData ? (
        <>
          <p>Category is selected</p>
          <p>Category : </p>
          {results.devices.toAddress != 0 && (
            <p
              style={{
                color: categoryData.category == "Device" ? "green" : "black",
              }}
              onClick={() => filterByCategory("Device")}
            >
              Device
              {categoryData.category == "Device" ? (
                <p>
                  {categoryData.data.devices.completed.toFixed(1)}/
                  {categoryData.data.devices.toAddress.toFixed(1)}
                </p>
              ) : (
                <p>
                  {results.devices.completed.toFixed(1)}/
                  {results.devices.toAddress.toFixed(1)}
                </p>
              )}
            </p>
          )}
          {results.apps.toAddress != 0 && (
            <p
              style={{
                color: categoryData.category == "Apps" ? "green" : "black",
              }}
              onClick={() => filterByCategory("Apps")}
            >
              Apps
              {categoryData.category == "Apps" ? (
                <p>
                  {categoryData.data.apps.completed.toFixed(1)}/
                  {categoryData.data.apps.toAddress.toFixed(1)}
                </p>
              ) : (
                <p>
                  {results.apps.completed.toFixed(1)}/
                  {results.apps.toAddress.toFixed(1)}
                </p>
              )}
            </p>
          )}
          {results.identitys.toAddress != 0 && (
            <p
              style={{
                color: categoryData.category == "Identity" ? "green" : "black",
              }}
              onClick={() => filterByCategory("Identity")}
            >
              Identity
              {categoryData.category == "Identity" ? (
                <p>
                  {categoryData.data.identitys.completed.toFixed(1)}/
                  {categoryData.data.identitys.toAddress.toFixed(1)}
                </p>
              ) : (
                <p>
                  {results.identitys.completed.toFixed(1)}/
                  {results.identitys.toAddress.toFixed(1)}
                </p>
              )}
            </p>
          )}
          <p>////////********************///////////////////</p>
          <p>Points achieved vs target : </p>
          {categoryData.data.points.achieved.toFixed(1)}/
          {categoryData.data.points.total.toFixed(1)}
          <p>////////********************///////////////////</p>
          <p onClick={() => filterByToAddress("To address")}>
            To address{" "}
            {(
              (categoryData.data.status.toAddress * 100) /
              (categoryData.data.status.toAddress +
                categoryData.data.status.completed)
            ).toFixed(1)}
          </p>
          <p>//</p>
          <p onClick={() => filterByToAddress("Completed")}>
            Completed{" "}
            {(
              (categoryData.data.status.completed * 100) /
              (categoryData.data.status.completed +
                categoryData.data.status.toAddress)
            ).toFixed(1)}
          </p>
        </>
      ) : toAddressData ? (
        <>
          <p>to adress is selected</p>
          <p>Category : </p>
          {toAddressData.data.devices.toAddress != 0 && (
            <p onClick={() => filterByCategory("Device")}>
              Device
              <p>
                {toAddressData.data.devices.completed.toFixed(1)}/
                {toAddressData.data.devices.toAddress.toFixed(1)}
              </p>
            </p>
          )}
          {toAddressData.data.apps.toAddress != 0 && (
            <p onClick={() => filterByCategory("Apps")}>
              Apps
              <p>
                {toAddressData.data.apps.completed.toFixed(1)}/
                {toAddressData.data.apps.toAddress.toFixed(1)}
              </p>
            </p>
          )}
          {toAddressData.data.identitys.toAddress != 0 && (
            <p onClick={() => filterByCategory("Identity")}>
              Identity
              <p>
                {toAddressData.data.identitys.completed.toFixed(1)}/
                {toAddressData.data.identitys.toAddress.toFixed(1)}
              </p>
            </p>
          )}
          <p>////////********************///////////////////</p>
          <p>Points achieved vs target : </p>
          {toAddressData.data.points.achieved.toFixed(1)}/
          {toAddressData.data.points.total.toFixed(1)}
          <p>////////********************///////////////////</p>
          <p onClick={() => filterByToAddress("To address")}>
            To address{" "}
            {(
              (results.status.toAddress * 100) /
              (results.status.toAddress + results.status.completed)
            ).toFixed(1)}
          </p>
          <p>//</p>
          <p onClick={() => filterByToAddress("Completed")}>
            Completed{" "}
            {(
              (results.status.completed * 100) /
              (results.status.completed + results.status.toAddress)
            ).toFixed(1)}
          </p>
        </>
      ) : results ? (
        <>
          <p>All selected</p>
          <p>Category : </p>
          {results.devices.toAddress != 0 && (
            <p onClick={() => filterByCategory("Device")}>
              Device {results.devices.completed.toFixed(1)}/
              {results.devices.toAddress.toFixed(1)}
            </p>
          )}
          {results.apps.toAddress != 0 && (
            <p onClick={() => filterByCategory("Apps")}>
              App /{results.apps.completed}/{results.apps.toAddress}
            </p>
          )}
          {results.identitys.toAddress != 0 && (
            <p onClick={() => filterByCategory("Identity")}>
              Identity {results.identitys.completed}/
              {results.identitys.toAddress} /
            </p>
          )}
          <p>////////********************///////////////////</p>
          <p>Points achieved vs target : </p>
          {results.points.achieved.toFixed(1)}/{results.points.total.toFixed(1)}
          <p>////////********************///////////////////</p>
          <p onClick={() => filterByToAddress("To address")}>
            To adress{" "}
            {(
              (results.status.toAddress * 100) /
              (results.status.toAddress + results.status.completed)
            ).toFixed(1)}
          </p>
          <p>//</p>
          <p onClick={() => filterByToAddress("Completed")}>
            Completed{" "}
            {(
              (results.status.completed * 100) /
              (results.status.completed + results.status.toAddress)
            ).toFixed(1)}
          </p>
        </>
      ) : null}
    </div>
  );
}

export default ResultsComponent;
