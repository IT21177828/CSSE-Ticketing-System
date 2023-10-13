import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Registration from './pages/Registration';
import BusRegistrationForm from './components/BusRegistrationForm';
import Dashboard from './components/Dashboard/Dashboard';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import BusRegistrationCard from './components/BusRegistrationCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/bus" element={<BusRegistrationForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/card" element={<BusRegistrationCard />} />
      </Routes>
    </Router>
  );
}

export default App;
