import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecommendedActions from "./components/RecommendedActions";
import NavBar from "./components/NavBar";
import DeviceRisk from "./components/DeviceRisk";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recommended-actions" element={<RecommendedActions />} />
        <Route path="/device-risk" element={<DeviceRisk />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
