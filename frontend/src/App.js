import { BrowserRouter, Routes, Route } from "react-router-dom";
import SeatBooking from "./components/SeatBooking/SeatBooking";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SeatSelection from "./components/SeatBooking/SeatSelection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/seats" element={<SeatSelection />} />
      </Routes>
    </BrowserRouter>
  );
}
