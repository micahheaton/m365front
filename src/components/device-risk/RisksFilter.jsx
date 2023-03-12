import React from "react";
import "../../styles/exposure.css";
import HoveredElement from "./HoveredElement";

function RisksFilter({ data, filterByRisks, filteredByRisk }) {
  return (
    <div className="exposure-wrapper">
      <div className="exposure-title">
        Risk Level {"("}count{")"}
      </div>
      <div className="exposure-content">
        {data.risks.map((el) => (
          <HoveredElement el={el} filteredByRisk={filteredByRisk} filterByRisks={filterByRisks}/>
        ))}
      </div>
    </div>
  );
}

export default RisksFilter;
