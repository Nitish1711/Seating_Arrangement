import React, { useState, useEffect } from "react";
import "./index.css";
import SeatIcon from "../SeatIcon";
import Navbar from "../Navbar";

const Home = () => {
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("A");
  // const [seats, setSeats] = useState([]);
  const [showBookSeat, setShowBookSeat] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [successMessage, setSuccessMessage] = useState("True");
  const [seat, setSeats] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const employeeId = localStorage.getItem("employeeId"); // assume employeeId is stored in local storage
      if (employeeId) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/employee/${employeeId}`
        );
        const data = await response.json();
        setEmployeeDetails(data);
      }
    };
    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/seats?zone=${zone}&date=${date}`
        );
        const data = await response.json();
        // setSeats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeats();
  }, [zone, date]);

   const handleBookSeat = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/book-seat?seatId=${selectedSeat.id}`,
        {
          method: "POST",
        }
      )
      const data = await response.json();
      if (data.success) {
        // Update the seat status in the state
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.id === selectedSeat.id ? { ...seat, is_booked: true } : seat
          )
        );
        setSuccessMessage("Seat booked successfully!");
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to book seat. Please try again.");
    }
    setShowBookSeat(false);
  };

  const handleCancel = () => {
    setShowBookSeat(false);
  };


  const handleSeatClick = (seat) => {
    console.log(seat); // should log the entire seat object
    setSelectedSeat(seat);
    setShowBookSeat(true);
  };

  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    seat_number: i + 1,
    is_booked: Math.random() < 0.5, // Randomly assign booked or not booked
  }));

  return (
    <div className="hello">
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
              isBooked={seat.is_booked}
              onClick={() => handleSeatClick(seat)}
            />
          ))}
        </div>
        {showBookSeat && (
          <div className="book-seat-container">
            <h2>Book Seat?</h2>
            <p>Seat Number: {selectedSeat?.seat_number}</p>
            <p>Zone: {zone}</p>
            <p>Date: {date}</p>
            <button onClick={handleBookSeat}>Book</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
         {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

      </div>
    </div>
  );
};

export default Home;
