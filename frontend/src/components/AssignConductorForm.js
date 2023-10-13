import React, { useState, useEffect } from "react";

const AssignConductorForm = () => {
  const [conductorName, setConductorName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [showConductorList, setShowConductorList] = useState(false);
  const [showBusList, setShowBusList] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  // Sample hardcoded conductor names and bus numbers
  const sampleConductorNames = [
    "Kamal Perera",
    "Nimal de Silva",
    "Sunimal Perera",
    "Bootiya Gunarathne",
    "Thilina Haawa",
  ];

  const sampleBusNumbers = [
    "NB-6554",
    "NA-5415",
    "BA-8798",
    "NA-4589",
    "NB-9854",
    "ND-4578",
  ];

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
    setTimeout(() => {
      // Handle the assignment logic here
      // After assignment is complete, reset the form and hide the lists
      setConductorName("");
      setBusNumber("");
      setShowConductorList(false);
      setShowBusList(false);
      setIsAssigning(false);
    }, 3000); // Simulating a 3-second delay for the assignment process
  };

  const selectConductor = (name) => {
    setConductorName(name);
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
              {sampleConductorNames
                .filter((name) =>
                  name.toLowerCase().includes(conductorName.toLowerCase())
                )
                .map((name) => (
                  <li
                    key={name}
                    className="cursor-pointer hover:bg-blue-200 p-1"
                    onClick={() => selectConductor(name)}
                  >
                    {name}
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
              {sampleBusNumbers
                .filter((number) =>
                  number.toLowerCase().includes(busNumber.toLowerCase())
                )
                .map((number) => (
                  <li
                    key={number}
                    className="cursor-pointer hover-bg-blue-200 p-1"
                    onClick={() => selectBus(number)}
                  >
                    {number}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-center">
        <button
  className={`${
    isAssigning
      ? "bg-blue-500 text-white cursor-not-allowed" // Change bg-red-500 to your desired color
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
    >
      {/* Add your SVG animation content here */}
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
