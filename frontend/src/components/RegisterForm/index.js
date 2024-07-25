import React, { useState } from "react";
import "./index.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNav = (e) => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeId && email && password) {
      try {
        await axios.post("http://localhost:5000/register", {
          username: email,
          password,
        });
        setMessage("Registration successful!");
        //navigate("/");
      } catch (error) {
        setMessage("Registration failed.");
        console.error("Registration failed:", error);
      }
    } else {
      setMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="register-main">
      <div className="registration-container">
        <h2 className="registration-title">Registration</h2>
        {message && <p className="registration-message">{message}</p>}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="form-input"
              required
            />
            <label className="form-label">Employee ID</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
            <label className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <label className="form-label">Password</label>
          </div>
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
        <div className="login-link">
          Already a Member?{" "}
          <button className="login-btn" onClick={handleNav}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
