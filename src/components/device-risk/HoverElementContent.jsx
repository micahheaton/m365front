import React, { useState } from "react";

function HoverElementContent({ data }) {
  return (
    <div
      style={{
        height: "300px",
        zIndex: 2,
        width: "100%",
        position: "absolute",
        top: "100%",
        paddingTop: "10px",
        left: 0,
      }}
    >
      <div className="exposure-title">devices</div>
      <div
        style={{
          overflowX: "hidden",
          overflowY: "scroll",

          border: "1px solid #c7c7c7",
          backgroundColor: "white",
          height: "100%",
          width: "100%",
        }}
      >
        {data.map((el) => (
          <p>{el["OS Platform"]}</p>
        ))}
      </div>
    </div>
  );
}

export default HoverElementContent;
