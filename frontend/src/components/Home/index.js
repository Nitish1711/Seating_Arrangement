import React, { useState } from "react";
import "./index.css";
import SeatIcon from "../SeatIcon/index";
import Navbar from "../Navbar";

const Home = () => {
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("A");

  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    seat_number: i + 1,
    status: Math.random() < 0.5, // Randomly assign booked or not booked
  }));

  return (
    <div className="hello">
      {
        "Cookies,One Pop Up on CLicking Button,Logout Button function,Cookies checking for Login"
      }
      {"Select seat will call api , Delete seat , edit seat option"}

      <Navbar />
      <div className="home">
        <h2>Home</h2>
        <form>
          <div className="date-zone">
            <label className="date-in">
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="zone-in">
              Zone:
              <select value={zone} onChange={(e) => setZone(e.target.value)}>
                <option value="A">Zone A</option>
                <option value="B">Zone B</option>
                <option value="C">Zone C</option>
              </select>
            </label>
          </div>
        </form>
        <div className="seating">
          {seats.map((seat) => (
            <SeatIcon
              key={seat.id}
              seatNumber={seat.seat_number}
              isBooked={seat.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
