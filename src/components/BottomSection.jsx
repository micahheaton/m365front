import React, { useMemo, useEffect, useState } from "react";
import { ReactComponent as ExportCSVIcon } from "../assets/export-csv.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/arrow-down.svg";
import { CSVLink } from "react-csv";
import MaterialReactTable from "material-react-table";

function BottomSection({ data }) {
  

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
      
    </div>
  );
}

export default BottomSection;
