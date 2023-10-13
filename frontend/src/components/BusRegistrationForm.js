import React, { useState } from 'react';

const BusRegistrationForm = () => {
  const [formData, setFormData] = useState({
    busName: '',
    busNumber: '',
    capacity: '',
    busRoute: '',
    conductorName: '',
    rootDistance: '', // New field for root distance
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can perform registration logic, such as sending the data to a server for processing.
    // If registration is successful, you can redirect the user to another page. If there's an error, set the error state.

    // Example: Simulating a registration error
    setError('Registration failed. Please try again.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `url(https://cdn.pixabay.com/photo/2017/11/08/00/33/london-2928889_1280.jpg) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg mt-40 mb-12">
        <div className="flex justify-center mb-8">
          <img
            src="https://t3.ftcdn.net/jpg/05/71/69/10/360_F_571691018_GxAIRdpQ1wk38db2lYkWQEhxqalnBsL3.jpg"
            alt="Logo"
            className="w-40 h-30"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-6 mb-6">Bus Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="busName" className="block mb-2 text-sm text-gray-600">
              Bus Name
            </label>
            <input
              type="text"
              id="busName"
              name="busName"
              value={formData.busName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="busNumber" className="block mb-2 text-sm text-gray-600">
              Bus Number
            </label>
            <input
              type="text"
              id="busNumber"
              name="busNumber"
              value={formData.busNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block mb-2 text-sm text-gray-600">
              Capacity
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="busRoute" className="block mb-2 text-sm text-gray-600">
              Bus Route
            </label>
            <input
              type="text"
              id="busRoute"
              name="busRoute"
              value={formData.busRoute}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rootDistance" className="block mb-2 text-sm text-gray-600">
              Root Distance
            </label>
            <input
              type="text"
              id="rootDistance"
              name="rootDistance"
              value={formData.rootDistance}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="conductorName" className="block mb-2 text-sm text-gray-600">
              Bus Conductor Name
            </label>
            <input
              type="text"
              id="conductorName"
              name="conductorName"
              value={formData.conductorName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
        
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
          >
            Create Bus
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 Bus Organization</p>
      </div>
    </div>
  );
};

export default BusRegistrationForm;