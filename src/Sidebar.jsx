import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for dropdown
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".navbar-icon")&&
        !event.target.closest(".dropdown") // Prevent closing when clicking inside dropdown
      
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="navbar-icon" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-btn" onClick={handleDropdown}>
          Mentor Details
        </button>

        {/* Dropdown Menu (With Checkboxes) */}
        {isDropdownOpen && (
          <div className="dropdown">
            {["Skill 1", "Skill 2", "Skill 3"].map((skill, index) => (
              <label key={index} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        )}

        <button className="sidebar-btn" onClick={handleHomeClick}>Home</button>  

        {/* <Link to="/evaluation-panel" className="sidebar-btn-link">
          <button className="sidebar-btn">Evaluation Panel</button> */}
        {/* </Link> */}
        <button className="sidebar-btn" onClick={() => navigate("/mentor-dashboard/evaluation-panel")}>
  Evaluation Panel
</button>

      </div>
    </>
  );
};

export default Sidebar;
