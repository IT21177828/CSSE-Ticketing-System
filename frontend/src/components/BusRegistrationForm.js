import React, { useState } from "react";
import axios from "axios";

const BusRegistrationForm = () => {
  const [formData, setFormData] = useState({
    busName: "",
    busNumber: "",
    capacity: "",

    busRoute: "", // Set a default value
    rootDistance: "", // New field for root distance
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const busData = {
      busName: formData.busName,
      busNumber: formData.busNumber,
      driverId: null,
      conductId: null,
      capacity: parseInt(formData.capacity),
      routeName: formData.busRoute,
      rootDistance: parseInt(formData.rootDistance),
    };

    axios.post("http://localhost:5050/bus", busData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location.href = "/admin/card";
      } else {
        setError(res.data);
      }
    });
  };

  return (
    <div>
      <div className="h-20 bg-[#333]">
        <h1 className="float-left mt-6 ml-8 text-3xl font-semibold text-white">
          Bus Registration
        </h1>
      </div>
      <div
        data-testid="busregister-1"
        className="flex items-center justify-center"
        style={{
          background: `url(https://cdn.pixabay.com/photo/2017/11/08/00/33/london-2928889_1280.jpg) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg mt-12 mb-2">
          <div className="flex justify-center mb-1">
            <img
              src="https://t3.ftcdn.net/jpg/05/71/69/10/360_F_571691018_GxAIRdpQ1wk38db2lYkWQEhxqalnBsL3.jpg"
              alt="Logo"
              className="w-40 h-30"
            />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-6 mb-6">
            Bus Registration
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="busName"
                className="block mb-2 text-sm text-gray-600"
              >
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
                placeholder="Bus Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="busNumber"
                className="block mb-2 text-sm text-gray-600"
              >
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
                placeholder="Bus Number"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="capacity"
                className="block mb-2 text-sm text-gray-600"
              >
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
                placeholder="Capacity"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="busRoute"
                className="block mb-2 text-sm text-gray-600"
              >
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
                list="routes" // Add a list attribute for datalist
                placeholder="Bus Route"
              />
              <datalist id="routes">
                {" "}
                {/* Add a datalist for default options */}
                <option value="Malabe to Kaduwela" />
                <option value="Malabe to Gampaha" />
                <option value="Galle to Kaduwela" />
                <option value="Galle to Malabe" />
                <option value="Malabe to Panadura" />
                <option value="Malabe to Kandy" />
              </datalist>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rootDistance"
                className="block mb-2 text-sm text-gray-600"
              >
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
                placeholder="Route Distance"
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
          <p className="text-xs text-gray-600 text-center mt-8">
            &copy; 2023 Bus Organization
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusRegistrationForm;
