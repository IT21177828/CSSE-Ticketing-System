import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Dashboard.css'; // Import the CSS file for this component

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/bus">Bus Registration</Link>
          </li>
          <li>
            <Link to="/">View All Buses</Link>
          </li>
          <li>
            <Link to="/bus">View Manager Details</Link>
          </li>
          <li>
            <Link to="/bus">View All Passengers</Link>
          </li>
        </ul>
      </div>

      <div className="content">
        {/* The content for different dashboard sections will be displayed here based on the routing */}
      </div>
    </div>
  );
};

export default Dashboard;
