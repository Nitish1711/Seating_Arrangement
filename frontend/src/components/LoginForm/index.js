import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const { logOfEmployeeDetails } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {
        cookie: cookies.user,
      });
      removeCookie('user', { path: '/' });
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNav = (e) => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: email,
          password,
        });
        const employeeId = response.data.employee.id;
        setCookie("user", response.data.cookie, { path: "/" });
        setMessage("Login successful!");
        logOfEmployeeDetails(employeeId)
        navigate("/home");
      } catch (error) {
        setMessage("Login failed. Please check your credentials.");
        console.error("Login failed:", error);
      }
    } else {
      setMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {message && <p className="login-message">{message}</p>}
        <form onSubmit={handleSubmit} className="login-form">
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
          <div className="forgot-password">
            <a href="#">Forget Password?</a>
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          Not a Member?{" "}
          <button className="register-btn" onClick={handleNav}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
