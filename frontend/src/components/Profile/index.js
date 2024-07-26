import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultShift, setDefaultShift] = useState("");
  const [defaultZone, setDefaultZone] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          mobileNumber,
          email,
          password,
          defaultShift,
          defaultZone,
        }),
      });
      const data = await response.json();
      console.log(data.message); // "Employee registered successfully"
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLogin = (e) => {
    navigate("/login");
  };

  return (
    <div className="main-register-cont">
      <div className="new-form-container">
        <h2 className="register-title">Profile</h2>
        <form onSubmit={handleSubmit} className="new-form">
          <div className="new-form-group">
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="new-form-input"
              required
            />
            <label htmlFor="employeeId" className="new-form-label">
              Employee ID
            </label>
          </div>
          <div className="new-form-group">
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="new-form-input"
              required
            />
            <label htmlFor="mobileNumber" className="new-form-label">
              Mobile Number
            </label>
          </div>
          <div className="new-form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="new-form-input"
              required
            />
            <label htmlFor="email" className="new-form-label">
              Email
            </label>
          </div>
          <div className="new-form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="new-form-input"
              required
            />
            <label htmlFor="password" className="new-form-label">
              Password
            </label>
          </div>
          <div className="new-form-group">
            <select
              id="defaultShift"
              value={defaultShift}
              onChange={(e) => setDefaultShift(e.target.value)}
              className="new-form-input"
              required
            >
              <option value="">Select Shift</option>
              <option value="Morning Shift">Morning Shift</option>
              <option value="Night Shift">Night Shift</option>
            </select>
            <label htmlFor="defaultShift" className="new-form-label">
              Default Shift
            </label>
          </div>
          <div className="new-form-group">
            <select
              id="defaultZone"
              value={defaultZone}
              onChange={(e) => setDefaultZone(e.target.value)}
              className="new-form-input"
              required
            >
              <option value="">Select Zone</option>
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
            </select>
            <label htmlFor="defaultZone" className="new-form-label">
              Default Zone
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;