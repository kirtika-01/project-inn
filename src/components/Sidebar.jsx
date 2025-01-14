import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/home" onClick={toggleSidebar}>
              <AiOutlineHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/requests" onClick={toggleSidebar}>
              Requests
            </Link>
          </li>
          <li>
            <span>Revised Teams</span>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
