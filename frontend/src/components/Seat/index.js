import React from "react";

const Seat = ({ seat }) => {
  return <div className={`seat ${seat.status}`}>{seat.id}</div>;
};

export default Seat;
