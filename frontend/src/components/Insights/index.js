import React from "react";
import "./index.css";
import Chart1 from "../Chart1";

const Insights = () => {
  const floor = { ab: 40, ac: 60, ad: 35, ae: 89, af: 65, ag: 45 };
  const department = { ab: 50, ac: 30, ad: 75, ae: 89, af: 15, ag: 75 };
  const days = { ab: 60, ac: 30, ad: 35, ae: 29, af: 55, ag: 35 };
  return (
    <>
    <div className="insights-main">
        <Chart1 data={floor} nameX={"Last Month Occupancy %"} nameY={"Floors"}/>
        <Chart1 data={department} nameX={"Last Month Occupancy %"} nameY={"Department"}/>
        <Chart1 data={days} nameX={"Last Week Occupancy %"} nameY={"Days"}/>
    </div>     
    </>
  );
};

export default Insights;
