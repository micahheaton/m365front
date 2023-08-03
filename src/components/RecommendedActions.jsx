import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import RcmdActions from "./RcmdActions";
import HighImpactRcmdActions from "./HighImpactRcmdActions";
import BottomSection from "./BottomSection";
import ModalAverage from "./ModalAverage";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RecommendedActions() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [data, setData] = useState(state);
  console.log(data);
  const [open, setOpen] = useState(false);
  const [ra, setRa] = useState({ achieved: 0, total: 0 });
  const [hra, setHra] = useState({ achieved: 0, total: 0 });
  const [weigtedResult, setWeightedResult] = useState(0);
  const calculateWeightenedPercentage = () => {
  
    const weigh = (ra.achieved / ra.total) * 0.25 +
    (hra.achieved / hra.total) * 0.75;
   console.log("weigh",weigh)
    setWeightedResult((ra.achieved / ra.total) * 0.25 +
      (hra.achieved / hra.total) * 0.75);
  };

  useEffect(() => {
    calculateWeightenedPercentage();
  }, [ra, hra]);

  useEffect(() => {
    if (state !== null) {
      setData(state);
    } else {
      navigate("/");
    }
  }, []);

  return (
    data && (
      <div className="bg-white-200">
        <div className="recom-action-container">
          <div className="flex-row justify-between mb-20">
            <Link to="/" className="breadcrumbs">
              <span>
                <ArrowLeft className="breadcrumbs-icon" />
              </span>
              <p className="breadcrumbs-content">Back to upload file</p>
            </Link>
            <div
              className="avg-btn"
              onClick={() => {
                setOpen(true);
              }}
            >
              Display Average
            </div>
          </div>
          <ModalAverage
            open={open}
            setOpen={setOpen}
            weigtedResult={(weigtedResult).toFixed(3)}
          />
          <div className="recom-action-wrapper">
            {/******** Recommended Actions ****** */}
            <RcmdActions setRa={setRa} fuld={data.recommended} />
            {/******** High Impact Recommended Actions ****** */}
            <HighImpactRcmdActions setHra={setHra} fuld={data.highImpact} />
          </div>
        </div>
        <BottomSection data={[...data.highImpact, ...data.recommended]} />
      </div>
    )
  );
}
