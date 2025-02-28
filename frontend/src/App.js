import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeatBooking from "./components/SeatBooking/SeatBooking";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import React, { useState } from 'react';
import SeatSelection from "./components/SeatBooking/SeatSelection";
import Profile from "./components/Profile";
import Insights from "./components/Insights"

export default function App() {
  const [employee_id,setEmployee_id] = useState("");

  const logOfEmployeeDetails = (eid) => {
    setEmployee_id(eid);
    console.log("Yes")
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home employee_id={employee_id}/>} />
        <Route path="/login" element={<LoginForm logOfEmployeeDetails={logOfEmployeeDetails} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}
