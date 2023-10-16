import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import BusRegistrationForm from "./components/BusRegistrationForm";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import AssignConductorForm from "./components/AssignConductorForm";
import BusDetails from "./pages/BusDetails";
import UserSelection from "./pages/UserSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/bus" element={<BusRegistrationForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/card" element={<BusDetails />} />
        <Route path="/assign" element={<AssignConductorForm />} />
        <Route path="/userDetails" element={<UserSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
