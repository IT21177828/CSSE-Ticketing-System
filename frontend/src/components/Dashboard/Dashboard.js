import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="admin-title">Admin</h2>
        <ul>
          <li>
            <Link to="/bus" className="sidebar-link">
              Bus Registration
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              View All Buses
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              View Manager Details
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              View All Passengers
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

export default Dashboard;
