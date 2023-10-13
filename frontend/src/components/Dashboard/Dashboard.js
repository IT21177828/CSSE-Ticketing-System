import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

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
          <li>
            <Link to="/quick-actions" className="sidebar-link">
              Quick Actions
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
              <h4 className="stat-title">Total Buses</h4>
              <div className="image-card">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/27/19/29/england-1283853_640.jpg"
                  alt="Total Buses"
                  style={{ borderRadius: "10%" }}
                />
              </div>
              <p className="stat-value">10</p>
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
              <h4 className="stat-title">Total Managers</h4>
              <div className="image-card">
                <img
                  src="https://cdn.pixabay.com/photo/2019/08/12/23/03/entrepreneur-4402272_640.jpg"
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

export default Dashboard;
