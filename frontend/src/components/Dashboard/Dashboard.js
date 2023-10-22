import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Dashboard.css";
import LandingAdmin from "./LandingAdmin";
import AssignConductorForm from "../AssignConductorForm";
import UserSelection from "../../pages/UserSelection";
import BusDetails from "../../pages/BusDetails";
import BusRegistrationForm from "../BusRegistrationForm";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="admin-title">Admin</h2>
        <ul>
          <li>
            <Link to="busReg/" className="sidebar-link">
              Bus Registration
            </Link>
          </li>
          <li>
            <Link to="card/" className="sidebar-link">
              View All Buses
            </Link>
          </li>
          <li>
            <Link to="/timetable" className="sidebar-link">
              View Timetables
            </Link>
          </li>
          <li>
            <Link to="passenger/" className="sidebar-link">
              View All Passengers
            </Link>
          </li>
          <li>
            <Link to="quick-actions/" className="sidebar-link">
              Quick Actions
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 h-screen overflow-auto">
        <Routes>
          <Route path="/" element={<LandingAdmin />} />
          <Route path="assign" element={<AssignConductorForm />} />
          <Route path="passenger" element={<UserSelection />} />
          <Route path="card" element={<BusDetails />} />
          <Route path="busReg" element={<BusRegistrationForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
