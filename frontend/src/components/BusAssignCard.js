import axios from "axios";
import React, { useEffect, useState } from "react";

const BusAssignCard = (props) => {
  const { busName, busNumber, capacity, busRoute, callback } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showConductorList, setShowConductorList] = useState(false);
  const [conductorName, setConductorName] = useState("");
  const [conductorId, setConductorId] = useState("");
  const [conductorList, setConductorList] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [errors, setErrors] = useState("");

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
  }, []);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setErrors("");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setErrors("");
    setConductorName("");
    setConductorId("");
  };

  const handleConductorNameChange = (e) => {
    setConductorName(e.target.value);
    setShowConductorList(true);
  };

  const handleAssign = () => {
    setIsAssigning(true);
    const data = {
      busNumber: busNumber,
      conductorId: conductorId,
    };

    if (data.conductorId.length === 0) {
      setErrors("Please select a conductor");
      setIsAssigning(false);
    } else {
      setErrors("");
      axios
        .post("http://localhost:5050/conductor/assign", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setTimeout(() => {
        setConductorName("");
        setShowConductorList(false);
        setIsAssigning(false);
        setErrors("");
        callback();
      }, 2000);
    }
  };
  const selectConductor = (name, userID) => {
    setErrors("");
    console.log(name, userID);
    setConductorName(name);
    setConductorId(userID);
    setShowConductorList(false);
  };

  return (
    <div className="w-full max-w-xl p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          {busRoute}
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-semibold text-blue-800 dark:text-gray-400">
          Bus Name: {busName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bus Number: {busNumber}
        </p>
        <p className="text-sm font-semibold text-green-600">
          Capacity: {capacity}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <div></div>
        <button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600 focus-ring-4 focus-ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={openDeleteModal}
        >
          Assign Conductor
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity rounded-md">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl text-left sm:max-w-lg ">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-lg">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Assign a conductor
                    </h3>
                    <div className="mt-2">
                      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
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
                            disabled
                          />
                        </div>
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
                            onClick={handleConductorNameChange}
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
                                      selectConductor(
                                        name.conductorName,
                                        name.userID
                                      )
                                    }
                                  >
                                    {name.conductorName}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                        {errors && (
                          <div className="mb-4 place-content-center justify-center">
                            <p className="text-red-500 text-xs italic">
                              {errors}
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 gap-4 py-3 sm:flex sm:flex-row-reverse rounded-lg sm:px-6">
                <button
                  type="button"
                  className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusAssignCard;
