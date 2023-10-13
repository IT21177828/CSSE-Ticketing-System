import React from 'react';

const BusRegistrationForm = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `url(https://cdn.pixabay.com/photo/2017/11/08/00/33/london-2928889_1280.jpg) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg mt-40 mb-12"> {/* Added mt-12 for top margin and mb-12 for bottom margin */}
        <div className="flex justify-center mb-8">
          <img
            src="https://t3.ftcdn.net/jpg/05/71/69/10/360_F_571691018_GxAIRdpQ1wk38db2lYkWQEhxqalnBsL3.jpg"
            alt="Logo"
            className="w-40 h-30"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-6 mb-6">Bus Registration</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="busName" className="block mb-2 text-sm text-gray-600">
              Bus Name
            </label>
            <input
              type="text"
              id="busName"
              name="busName"
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
        </form>
        <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 Bus Organization</p>
      </div>
    </div>
  );
};

export default BusRegistrationForm;
