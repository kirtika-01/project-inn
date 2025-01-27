import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>Close</button>
            <h2>Sidebar Content</h2>
            {/* Add more sidebar content here */}
        </div>
    );
};

export default Sidebar;
