import React, { useState } from "react";
import HoverElementContent from "./HoverElementContent";

function HoveredElement({ el, filterByRisks, filteredByRisk }) {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => filterByRisks(el.name)}
      className="pointer exposure-item"
    >
      {show && <HoverElementContent data={el.risks} />}
      <span className="exposure-item-nb">{el.count}</span>
      <p
        style={{
          color:
            filteredByRisk == el.name ? "orange" : "var(--color-calcite-800)",
        }}
        className="exposure-item-subtitle"
      >
        {el.name}
      </p>
    </div>
  );
}

export default HoveredElement;
