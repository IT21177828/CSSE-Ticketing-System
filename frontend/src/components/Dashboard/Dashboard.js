import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Dashboard.css";
import LandingAdmin from "./LandingAdmin";
import AssignConductorForm from "../AssignConductorForm";
import UserSelection from "../../pages/UserSelection";
import BusDetails from "../../pages/BusDetails";
import BusRegistrationForm from "../BusRegistrationForm";
import BusSchedulePage from "../BusTimetable/BusSchedulePage";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>
          <Link to="/admin" className="admin-title">
            Admin
          </Link>
        </h2>
        <ul>
          <li>
            <Link to="" className="sidebar-link">
              Dashboard
            </Link>
          </li>
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
            <Link to="timetab/" className="sidebar-link">
              View Timetables
            </Link>
          </li>
          <li>
            <Link to="passenger/" className="sidebar-link">
              View All Passengers
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
          <Route path="timeTab" element={<BusSchedulePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
