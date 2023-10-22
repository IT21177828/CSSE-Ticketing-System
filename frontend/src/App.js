import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import BusDetails from "./pages/BusDetails";
import BusSchedulePage from "./components/BusTimetable/BusSchedulePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/manager/*" element={<ManagerDashboard />} />
        <Route path="/card" element={<BusDetails />} />
        <Route path="/timetable" element={<BusSchedulePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
