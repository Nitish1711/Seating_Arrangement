import React from "react";

const SeatBookingModal = ({ seat, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Book Seat {seat} for today?</h3>
        <button className="button" onClick={() => onConfirm(true)}>
          Yes
        </button>
        <button className="button" onClick={() => onConfirm(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default SeatBookingModal;
