import React from 'react';

const SeatIcon = ({ isBooked, seatNumber }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"  // Increased the viewBox size for a larger icon
        width="64"        // Increased the width
        height="64"       // Increased the height
    >
        <rect x="16" y="24" width="32" height="16" fill={isBooked ? "red" : "green"} stroke="black" strokeWidth="2" />
        <rect x="12" y="40" width="40" height="4" fill="white" stroke="black" strokeWidth="2" />
        <rect x="16" y="44" width="4" height="8" fill="white" stroke="black" strokeWidth="2" />
        <rect x="44" y="44" width="4" height="8" fill="white" stroke="black" strokeWidth="2" />
        <text x="32" y="58" fill="black" fontSize="12" fontFamily="Arial" textAnchor="middle" dominantBaseline="middle">
            {seatNumber}
        </text>
    </svg>
);

export default SeatIcon;