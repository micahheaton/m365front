import React from "react";
import "../../styles/exposure.css";
import HoveredElement from "./HoveredElement";

export default function ExposureBreakdown({
  data,
  filterByExposure,
  filteredByExposure,
}) {
  return (
    <div className="exposure-wrapper">
      <div className="exposure-title">
        Exposure Breakdown by Domain {"("}count{")"}
      </div>
      <div className="exposure-content">
        {data.slice(0, 3).map((el) => (
          <HoveredElement
            el={el}
            filteredByRisk={filteredByExposure}
            filterByRisks={filterByExposure}
          />
        ))}
      </div>
    </div>
  );
}
