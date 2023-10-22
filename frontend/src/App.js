import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/manager/*" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
