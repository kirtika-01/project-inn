import React from "react";
import './Header.css';
import Sidebar from "./Sidebar";
const Header = ({ onLogout }) => {
  return (
    <header className="dashboard-header">
      <Sidebar />
      <div className="dashboard-header-text">
        Mentor Dashboard
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;