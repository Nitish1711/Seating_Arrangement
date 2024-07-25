import React, { useState, useEffect } from "react";
import SeatIcon from "../SeatIcon";

const mockSeats = [
  { id: 1, status: "booked" },
  { id: 2, status: "booked" },
  { id: 3, status: "booked" },
  { id: 4, status: "booked" },
  { id: 5, status: "booked" },
  { id: 6, status: "available" },
  { id: 7, status: "available" },
  { id: 8, status: "booked" },
  { id: 9, status: "booked" },
  { id: 10, status: "available" },
  { id: 11, status: "available" },
  { id: 12, status: "available" },
  { id: 13, status: "available" },
  { id: 14, status: "booked" },
  { id: 15, status: "booked" },
  { id: 16, status: "available" },
  { id: 17, status: "booked" },
  { id: 18, status: "booked" },
  { id: 19, status: "available" },
  { id: 20, status: "available" },
  { id: 21, status: "booked" },
  { id: 22, status: "available" },
  { id: 23, status: "booked" },
  { id: 24, status: "booked" },
  { id: 25, status: "available" },
  { id: 26, status: "available" },
  { id: 27, status: "booked" },
  { id: 28, status: "available" },
  { id: 29, status: "booked" },
  { id: 30, status: "available" },
];

const generateSeats = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    id: start + i,
    seat_number: start + i,
    status: Math.random() < 0.5 ? "booked" : "available", // Randomly assign booked or not booked
  }));
};

const seats = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  seat_number: i + 1,
  status: Math.random() < 0.5 ? 'booked' : 'avaialable', // Randomly assign booked or not booked
}));

const SeatBooking = () => {
  const [date, setDate] = useState("");
  const [floor, setFloor] = useState("Select Floor");
  const [zone, setZone] = useState("Select Zone");
  //const [shift, setShift] = useState("Choose Shift");
   const [seats, setSeats] = useState([]);

  // useEffect(() => {
  //   // Fetch seats based on selected options
  //   setSeats(mockSeats);
  // }, [date, floor, zone, shift]);


  useEffect(() => {
    switch (zone) {
      case "Zone A":
        setSeats(generateSeats(1, 30));
        break;
      case "Zone B":
        setSeats(generateSeats(31, 60));
        break;
      case "Zone C":
        setSeats(generateSeats(61, 90));
        break;
      default:
        setSeats([]);
    }
  }, [zone]);

  return (
    <div className="seat-booking-container">
      <div className="seat-booking-options">
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Floor:</label>
          <select value={floor} onChange={(e) => setFloor(e.target.value)}>
            <option value="select-floor">Select Floor</option>
            <option value="5">5th Floor</option>
            <option value="6">6th Floor</option>
            <option value="10">10th Floor</option>
          </select>
        </div>
        <div>
          <label>Zone:</label>
          <select value={zone} onChange={(e) => setZone(e.target.value)}>
            <option value="select-zone">Select Zone</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
        </div>
        {/* <div>
          <label>Shift:</label>
          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="select-shift">Choose Shift</option>

            <option value="Shift 1">Shift 1</option>
            <option value="Shift 2">Shift 2</option>
            <option value="Shift 3">Shift 3</option>
          </select>
        </div> */}
      </div>
      <div className="seat-booking-grid">
        {seats.map((seat) => (
          <SeatIcon
            key={seat.id}
            seatNumber={seat.seat_number}
            isBooked={seat.status}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;
