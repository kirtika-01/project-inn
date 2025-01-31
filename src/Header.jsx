import React, { useState } from "react";
import './Header.css';
import Sidebar from "./Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const Header = ({ onLogout }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventText(events[date.toDateString()] || "");
  };

  const addEvent = () => {
    if (selectedDate && eventText.trim()) {
      setEvents(prev => ({
        ...prev,
        [selectedDate.toDateString()]: eventText
      }));
      setEventText("");
      setSelectedDate(null);
    }
  };

  const tileContent = ({ date }) => {
    return events[date.toDateString()] ? (
      <div className="event-dot" title={events[date.toDateString()]}></div>
    ) : null;
  };
  
  return (
    <header className="dashboard-header">
      <Sidebar />
      <div className="dashboard-header-text">Mentor Dashboard</div>
      <div className="calendar-container">
        <FaCalendarAlt className="calendar-icon" onClick={toggleCalendar} />
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar onClickDay={handleDateClick} tileContent={tileContent} className="custom-calendar" />
            {selectedDate && (
              <div className="event-input">
                <input
                  type="text"
                  placeholder="Add event"
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                />
                <button onClick={addEvent}>Save</button>
              </div>
            )}
          </div>
        )}
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;