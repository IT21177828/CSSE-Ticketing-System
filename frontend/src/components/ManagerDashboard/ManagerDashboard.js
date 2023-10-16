import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="admin-title">Manager</h2>
        <ul>
          <li>
            <Link to="/userDetails" className="sidebar-link">
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
          <li>
            <Link to="/card" className="sidebar-link">
              View All Buses
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="sidebar-link">
              <FontAwesomeIcon icon={faBell} className="notification-icon" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="dashboard-overview">
          <h3
            style={{
              fontFamily: "Your Font Name, sans-serif",
              fontSize: "28px",
              color: "black",
              fontWeight: "normal",
            }}
          >
            Dashboard Overview
          </h3>

          <div className="overview-stats">
            <div className="stat-card">
              <h4 className="stat-title">Total Amount</h4>
              <div className="image-card">
                <img
                  src="https://cdn.pixabay.com/photo/2012/03/01/01/03/background-19939_640.jpg"
                  alt="Total Buses"
                  style={{ borderRadius: "10%" }}
                />
              </div>
              <p className="stat-value">Rs.50000</p>
            </div>
            <div className="stat-card">
              <h4 className="stat-title">Total Passengers</h4>
              <div className="image-card">
                <img
                  src="https://cdn.pixabay.com/photo/2020/01/31/07/27/people-4807330_640.jpg"
                  alt="Total Passengers"
                  style={{ borderRadius: "10%" }}
                />
              </div>
              <p className="stat-value">400</p>
            </div>
            <div className="stat-card">
              <h4 className="stat-title">Total Conductors</h4>
              <div className="image-card">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Total Managers"
                  style={{ borderRadius: "10%" }}
                />
              </div>
              <p className="stat-value">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
