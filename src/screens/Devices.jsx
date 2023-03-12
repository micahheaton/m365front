import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { modelDevices } from "../utils/ModelDevices";

function Devices() {
  const [arrList, setArrList] = useState([]);
  const [filteredArrList, setFilteredArrList] = useState([]);

  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setArrList(results.data);
        const dat = modelDevices(results.data);
        setData(dat);
        setFilteredData(dat);
      },
    });
  };

  function calculateData(arr) {
    setFilteredData(modelDevices(arr));
  }

  useEffect(() => {
    calculateData(filteredArrList);
  }, [filteredArrList]);

  const filterByManaged = (name) => {
    console.log(arrList)
    setFilteredArrList(arrList.filter((el) => el["Managed By"] === name));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <p onClick={() => console.log(data)}>click me</p>
      {filteredData && (
        <>
          {filteredData.managedBy.map((el) => (
            <p onClick={() => filterByManaged(el.name)}>
              {el.name} {el.count}
            </p>
          ))}
          <p>***********************************************</p>
          {filteredData.osPlatform.map((el) => (
            <p>
              {el.name} {el.count}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default Devices;
