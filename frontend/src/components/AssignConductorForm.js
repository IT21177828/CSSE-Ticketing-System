import axios from "axios";
import React, { useState, useEffect } from "react";

const AssignConductorForm = () => {
  const [conductorName, setConductorName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [showConductorList, setShowConductorList] = useState(false);
  const [showBusList, setShowBusList] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [conductorList, setConductorList] = useState([]);
  const [busList, setBusList] = useState([]);
  const [conductorId, setConductorId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/conductor/notAssigned")
      .then((res) => {
        console.log(res.data);
        setConductorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5050/bus/free")
      .then((res) => {
        console.log(res.data);

        setBusList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleConductorNameChange = (e) => {
    setConductorName(e.target.value);
    setShowConductorList(true);
  };

  const handleBusNumberChange = (e) => {
    setBusNumber(e.target.value);
    setShowBusList(true);
  };

  const handleAssign = () => {
    // Simulate loading for a few seconds
    setIsAssigning(true);
    const data = {
      busNumber: busNumber,
      conductorId: conductorId,
    };

    axios.post("http://localhost:5050/conductor/assign", data).then((res) => {
      console.log(res.data);
    });

    setTimeout(() => {
      setConductorName("");
      setBusNumber("");
      setShowConductorList(false);
      setShowBusList(false);
      setIsAssigning(false);
    }, 2000);
  };

  const selectConductor = (name, userID) => {
    setConductorName(name);
    setConductorId(userID);
    setShowConductorList(false);
  };

  const selectBus = (number) => {
    setBusNumber(number);
    setShowBusList(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-60">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="conductorName"
          >
            Conductor Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="conductorName"
            type="text"
            placeholder="Conductor Name"
            value={conductorName}
            onChange={handleConductorNameChange}
          />
          {showConductorList && (
            <ul className="border border-gray-300 rounded p-2 mt-2 max-h-24 overflow-y-auto">
              {conductorList
                .filter((name) =>
                  name.conductorName
                    .toLowerCase()
                    .includes(conductorName.toLowerCase())
                )
                .map((name) => (
                  <li
                    key={name.conductorName}
                    className="cursor-pointer hover-bg-blue-200 p-1"
                    onClick={() =>
                      selectConductor(name.conductorName, name.userID)
                    }
                  >
                    {name.conductorName}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="busNumber"
          >
            Bus Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="busNumber"
            type="text"
            placeholder="Bus Number"
            value={busNumber}
            onChange={handleBusNumberChange}
          />
          {showBusList && (
            <ul className="border border-gray-300 rounded p-2 mt-2 max-h-24 overflow-y-auto">
              {busList
                .filter((number) =>
                  number.busNumber
                    .toLowerCase()
                    .includes(busNumber.toLowerCase())
                )
                .map((number) => (
                  <li
                    key={number.busNumber}
                    className="cursor-pointer hover-bg-blue-200 p-1"
                    onClick={() => selectBus(number.busNumber)}
                  >
                    {number.busNumber}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`${
              isAssigning
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleAssign}
            disabled={isAssigning}
          >
            {isAssigning ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : null}
            {isAssigning ? "Assigning..." : "Assign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignConductorForm;
