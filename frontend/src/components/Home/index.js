import React, { useState , useEffect } from "react";
import "./index.css";
import SeatIcon from "../SeatIcon/index";
import Navbar from "../Navbar";

const Home = () => {
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("A");
  // const [seats, setSeats] = useState([]);
  const [showBookSeat, setShowBookSeat] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const employeeId = localStorage.getItem("employeeId"); // assume employeeId is stored in local storage
      if (employeeId) {
        const response = await fetch(`/api/employee/${employeeId}`);
        const data = await response.json();
        setEmployeeDetails(data);
      }
    };
    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/seats?zone=${zone}&date=${date}`);
        const data = await response.json();
        // setSeats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeats();
  }, [zone, date]);

  const handleSeatClick = (seat) => {
    console.log(seat); // should log the entire seat object
    setSelectedSeat(seat);
    setShowBookSeat(true);
  };
  
  const handleBookSeat = async () => {
    try {
      const response = await fetch(`/api/book-seat?seatId=${selectedSeat.id}`, {
        method: "POST",
      });
      const data = await response.json();
      // if (data.success) {
      //   // Update the seat status in the state
      //   setSeats((prevSeats) =>
      //     prevSeats.map((seat) =>
      //       seat.id === selectedSeat.id ? { ...seat, is_booked: true } : seat
      //     )
      //   );
      // }
    } catch (error) {
      console.error(error);
    }
    setShowBookSeat(false);
  };

  const handleCancel = () => {
    setShowBookSeat(false);
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
            <p>Zone : {zone}</p>
            <p>Date: {date}</p>
            <button onClick={handleBookSeat}>Book</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [floors, setFloors] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [selectedFloor, setSelectedFloor] = useState(1);
//   const [selectedZone, setSelectedZone] = useState('A');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('Morning');
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [employeeDetails, setEmployeeDetails] = useState({});

//   useEffect(() => {
//     axios.get('/api/seats')
//       .then(response => {
//         setFloors(response.data.floors);
//         setZones(response.data.zones);
//         setSeats(response.data.seats);
//       })
//       .catch(error => {
//         console.error(error);
//       });

//     axios.get('/api/bookings/today')
//       .then(response => {
//         setBookedSeats(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });

//     axios.get('/api/employee/details')
//       .then(response => {
//         setEmployeeDetails(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleFloorChange = (event) => {
//     setSelectedFloor(event.target.value);
//   };

//   const handleZoneChange = (event) => {
//     setSelectedZone(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleShiftChange = (event) => {
//     setSelectedShift(event.target.value);
//   };

//   const handleSeatClick = (seat) => {
//     // Open description page with seat details and booking form
//     console.log(`Seat ${seat.id} clicked`);
//   };

//   return (
//     <div className="home-page">
//       <nav className="nav-bar">
//         <ul>
//           <li><a href="#">Home</a></li>
//           <li><a href="#">Profile</a></li>
//           <li><a href="#">History</a></li>
//           <li><a href="#">Insights</a></li>
//           <li><a href="#">Log out</a></li>
//         </ul>
//       </nav>
//       <div className="seat-selection">
//         <select value={selectedFloor} onChange={handleFloorChange}>
//           {floors.map((floor, index) => (
//             <option key={index} value={floor.id}>{floor.name}</option>
//           ))}
//         </select>
//         <select value={selectedZone} onChange={handleZoneChange}>
//           {zones.map((zone, index) => (
//             <option key={index} value={zone.id}>{zone.name}</option>
//           ))}
//         </select>
//         <input type="date" value={selectedDate} onChange={handleDateChange} />
//         <select value={selectedShift} onChange={handleShiftChange}>
//           <option value="Morning">Morning (9:00 - 6:30)</option>
//           <option value="Night">Night (7:00 - 2:00)</option>
//         </select>
//       </div>
//       <div className="seat-map">
//         {seats.map((seat) => (
//           <div key={seat.id} className={`seat ${bookedSeats.includes(seat.id) ? 'booked' : 'available'}`} onClick={() => handleSeatClick(seat)}>
//             {seat.id}
//           </div>
//         ))}
//       </div>
//       <div className="description-page">
//         {/* Description page will be rendered here */}
//       </div>
//     </div>
//   );
// };

// export default Home;