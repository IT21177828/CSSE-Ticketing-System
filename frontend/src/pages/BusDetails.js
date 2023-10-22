import React, { useState, useEffect } from "react";
import BusRegistrationCard from "../components/BusRegistrationCard";
import axios from "axios";
import "./BusDetails.css";

export default function BusDetails() {
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedBusName, setUpdatedBusName] = useState("");
  const [updatedBusRoute, setUpdatedBusRoute] = useState("");
  const [updatedCapacity, setUpdatedCapacity] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5050/bus/all")
      .then((res) => {
        setBusData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const openModal = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
    setUpdatedBusName(bus.busName);
    setUpdatedBusRoute(bus.routeName);
    setUpdatedCapacity(bus.capacity);   
  };

  const closeModal = () => {
    setSelectedBus(null);
    setIsModalOpen(false);    
  };

  const updateBusDetails = () => {
    console.log({
      a: selectedBus.busNumber,
      b: selectedBus.conductId,
      c: selectedBus.routeName,
      e: updatedBusName,
      d: updatedCapacity,
    });
    axios
      .put(`http://localhost:5050/bus/edit`, {
        busNumber: selectedBus.busNumber,
        busName: updatedBusName,
        capacity: updatedCapacity,
        conductId: selectedBus.conductId,
        routeName: selectedBus.routeName,
      })
      .then((res) => {
        console.log(res.data);
        setRender(!render);
      });

    closeModal();
  };

  const deleteBus = (busId) => {
    axios
      .delete(` http://localhost:5050/bus/remove?id=${busId}`)
      .then((res) => {
        console.log(res.data);
        closeModal();
        setRender(!render);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const splitBusDataIntoRows = () => {
    const rows = [];
    for (let i = 0; i < busData.length; i += 2) {
      rows.push(
        <div
          className="flex flex-row gap-5 items-center content-center place-content-center mb-4"
          key={i}
        >
          <BusRegistrationCard
            busName={busData[i].busName}
            busNumber={busData[i].busNumber}
            capacity={busData[i].capacity}
            busRoute={busData[i].routeName}
            onEdit={() => openModal(busData[i])}
            onDelete={() => deleteBus(busData[i].busNumber)} // Implement delete function
          />
          {i + 1 < busData.length && (
            <BusRegistrationCard
              busName={busData[i + 1].busName}
              busNumber={busData[i + 1].busNumber}
              capacity={busData[i + 1].capacity}
              busRoute={busData[i + 1].routeName}
              onEdit={() => openModal(busData[i + 1])}
              onDelete={() => deleteBus(busData[i + 1].busNumber)} // Implement delete function
            />
          )}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="bus-details ">
      <div className="h-20 bg-[#333] mb-16">
        <h1 className="float-left mt-6 ml-8 text-2xl font-semibold text-white">
          Bus Details
        </h1>
      </div>

      {splitBusDataIntoRows()}
      {selectedBus && (
        <div
          id="defaultModal"
          className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
            isModalOpen ? "" : "hidden"
          }`}
        >
          <div className="relative w-full max-w-2xl max-h-full mx-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Update Bus Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    {/* ... (previous code) */}
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500">
                  Bus Name: {selectedBus.busName}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  Bus Route: {selectedBus.routeName}
                </p>
                <p className="text-base leading-relaxed text-gray-500">
                  Capacity: {selectedBus.capacity}
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="newBusName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    New Bus Name:
                  </label>
                  <input
                    type="text"
                    id="newBusName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter new bus name"
                    value={updatedBusName}
                    onChange={(e) => setUpdatedBusName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newBusNumber"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    New Bus Route:
                  </label>
                  <input
                    type="text"
                    id="newBusNumber"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter new bus number"
                    value={updatedBusRoute}
                    onChange={(e) => setUpdatedBusRoute(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newCapacity"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    New Capacity:
                  </label>
                  <input
                    type="number"
                    id="newCapacity"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter new capacity"
                    value={updatedCapacity}
                    onChange={(e) => setUpdatedCapacity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-12 items-center place-content-center p-6 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={updateBusDetails}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover-bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
