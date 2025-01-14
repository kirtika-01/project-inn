import React from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="menu-icon" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Project Management</h1>
    </div>
  );
};

export default Navbar;
