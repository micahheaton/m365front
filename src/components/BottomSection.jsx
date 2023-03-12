import React, { useMemo, useEffect, useState } from "react";
import { ReactComponent as ExportCSVIcon } from "../assets/export-csv.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/arrow-down.svg";
import { CSVLink } from "react-csv";
import MaterialReactTable from "material-react-table";

function BottomSection({ data }) {
  // const [filteredData, setFilteredData] = useState({
  //   devices: [],
  //   apps: [],
  //   identity: [],
  // });
  // // const [isDevicesShown, setIsDevicesShown] = useState(true);
  // // const [isAppsShown, setIsAppsShown] = useState(true);
  // // const [isIdentityShown, setIsIdentityShown] = useState(true);
  // function filterData() {
  //   const dev = [];
  //   const app = [];
  //   const idd = [];
  //   data.forEach((element) => {
  //     if (element.Category == "Device") {
  //       dev.push(element);
  //     } else if (element.Category == "Apps") {
  //       app.push(element);
  //     } else if (element.Category == "Identity") {
  //       idd.push(element);
  //     }
  //   });

  //   setFilteredData({
  //     devices: dev,
  //     apps: app,
  //     identity: idd,
  //   });
  // }
  // useEffect(() => {
  //   filterData();
  // }, []);

  //**************table****************** */
  const columns = useMemo(
    () => [
      {
        accessorKey: "Category",
        header: "Category",
      },
      {
        accessorKey: "Have license?",
        header: "Have license?",
      },
      {
        accessorKey: "Last synced ",
        header: "Last synced ",
      },
      {
        accessorKey: "Microsoft update",
        header: "Microsoft update",
      },
      {
        accessorKey: "Notes",
        header: "Notes",
      },
      {
        accessorKey: "Points achieved",
        header: "Points achieved",
      },
      {
        accessorKey: "Product",
        header: "Product",
      },
      {
        accessorKey: "Rank",
        header: "Rank",
      },
      {
        accessorKey: "Recommended action",
        header: "Recommended action",
      },
      {
        accessorKey: "Regressed",
        header: "Regressed",
      },
      {
        accessorKey: "Score impact",
        header: "Score impact",
      },
      {
        accessorKey: "Status",
        header: "Status",
      },
      {
        accessorKey: "color",
        header: "color",
      },
    ],
    []
  );

  return (
    <div className="bottom-section p-horizontal">
      <div className="flex-row align-center justify-between mb-20">
        <div className="title">Result Data:</div>
        <CSVLink className="export-btn" data={data}>
          <ExportCSVIcon style={{ width: "24px", height: "24px" }} />
          <span style={{ marginLeft: "8px" }}>Export Data</span>
        </CSVLink>
      </div>
      <div className="mb-56">
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection={false} //enable some features
          enableGlobalFilter={false} //turn off a feature
          enableGrouping
          enableColumnDragging={false}
          initialState={{
            grouping: ["Category"],
            expanded: true,
            density: "compact",
          }}
        />
      </div>
      {/* <div className="collapse-container">
        <div className="mb-20">
          <div
            onClick={() => setIsDevicesShown(!isDevicesShown)}
            className="collapse-header flex-row align-center justify-between pointer"
          >
            <span>Devices</span>
            <span
              style={
                isDevicesShown
                  ? {
                      transform: "rotate(180deg)",
                      transition: "0.2s linear",
                    }
                  : { transition: "0.2s linear" }
              }
            >
              <ArrowDownIcon />
            </span>
          </div>
          {isDevicesShown &&
            filteredData.devices.map((el) => (
              <p className="collapse-item">
                {el["Recommended action"]} // {el["Points achieved"]} //
                {el["Score impact"]} // {el["Status"]}
              </p>
            ))}
        </div>
        <div className="mb-20">
          <p
            onClick={() => setIsAppsShown(!isAppsShown)}
            className="collapse-header flex-row align-center justify-between pointer"
          >
            <span>Apps</span>
            <span
              style={
                isAppsShown
                  ? {
                      transform: "rotate(180deg)",
                      transition: "0.2s linear",
                    }
                  : { transition: "0.2s linear" }
              }
            >
              <ArrowDownIcon />
            </span>
          </p>
          {isAppsShown &&
            filteredData.apps.map((el) => (
              <p className="collapse-item">
                {el["Recommended action"]} // {el["Points achieved"]} //
                {el["Score impact"]} // {el["Status"]}
              </p>
            ))}
        </div>
        <div className="mb-20">
          <p
            onClick={() => setIsIdentityShown(!isIdentityShown)}
            className="collapse-header flex-row align-center justify-between pointer"
          >
            <span>Identity</span>
            <span
              style={
                isIdentityShown
                  ? {
                      transform: "rotate(180deg)",
                      transition: "0.2s linear",
                    }
                  : { transition: "0.2s linear" }
              }
            >
              <ArrowDownIcon />
            </span>
          </p>
          {isIdentityShown &&
            filteredData.identity.map((el) => (
              <p className="collapse-item">
                {el["Recommended action"]} // {el["Points achieved"]} //
                {el["Score impact"]} // {el["Status"]}
              </p>
            ))}
        </div>
      </div> */}
    </div>
  );
}

export default BottomSection;
