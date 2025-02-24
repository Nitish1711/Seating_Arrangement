import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-link">
          Home
        </Link>
      </div>
      <div className="navbar-right">
        <div className="align">
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
          <Link to="/insights" className="navbar-link">
            insights
          </Link>
          <Link to="/register" className="navbar-link">
            Log-out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
