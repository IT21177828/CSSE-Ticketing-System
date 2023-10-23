import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./ManagerDashboard.css";
import AssignConductorForm from "../AssignConductorForm";
import LandingDashboard from "./LandingDashboard";
import UserSelection from "../../pages/UserSelection";
import BusDetails from "../../pages/BusDetails";
import BusSchedulePage from "../BusTimetable/BusSchedulePage";

const ManagerDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="admin-title">Manager</h2>
        <ul>
          <li>
            <Link to="" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="passenger/" className="sidebar-link">
              Passenger Details
            </Link>
          </li>
          <li>
            <Link to="assign/" className="sidebar-link">
              Assign Conductors
            </Link>
          </li>
          <li>
            <Link to="timeTab/" className="sidebar-link">
              Time Tables
            </Link>
          </li>
          <li>
            <Link to="card" className="sidebar-link">
              View All Buses
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 h-screen overflow-auto">
        <Routes>
          <Route path="/" element={<LandingDashboard />} />
          <Route path="assign" element={<AssignConductorForm />} />
          <Route path="passenger" element={<UserSelection />} />
          <Route path="card" element={<BusDetails />} />
          <Route path="timeTab" element={<BusSchedulePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagerDashboard;
