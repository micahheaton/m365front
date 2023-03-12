import React from "react";

export default function NavBar() {
  return (
    <div className="navbar justify-between">
      <div style={{ flex: 1 }} className="logo"></div>
      <p style={{ flex: 4, textAlign: "center" }} className="nav-title">
        Best Practice Configuration
      </p>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}
