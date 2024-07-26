import React, { useState } from 'react';
import SeatBookingModal from '../SeatBookingModal'

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [message, setMessage] = useState("");

  const seats = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
      setIsModalOpen(true);
    } else {
      setMessage(`Seat ${seat} is already booked!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleBooking = (confirmed) => {
    if (confirmed) {
      setBookedSeats([...bookedSeats, selectedSeat]);
      setMessage(`Your seat ${selectedSeat} is booked!`);
    } else {
      setMessage("");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2>Select a Seat</h2>
      {message && <p>{message}</p>}
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat}
            className={`seat ${bookedSeats.includes(seat) ? 'booked' : ''}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <SeatBookingModal
          seat={selectedSeat}
          onConfirm={handleBooking}
        />
      )}
    </div>
  );
};

export default SeatSelection;
