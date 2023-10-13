import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerDashboard.css'; 

const ManagerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="admin-title">Manager</h2>
        <ul>
          <li>
            <Link to="/bus" className="sidebar-link">
              Passenger Details
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              Finance
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              Conductor Details
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              Time Tables
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {/* Your dashboard content goes here */}
      </div>
    </div>
  );
};

export default ManagerDashboard;
