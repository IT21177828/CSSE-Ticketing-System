import axios from "axios";
import React, { useState, useEffect } from "react";
import BusAssignCard from "./BusAssignCard";

const AssignConductorForm = () => {
  const [busList, setBusList] = useState([]);
  const [render, setRender] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [retrievedUsers, setRetrievedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/bus/free")
      .then((res) => {
        console.log(res.data);

        setBusList(res.data);
        setRetrievedUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const renderePage = () => {
    setRender(!render);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // If the search term is empty, show all users
    if (!searchTerm) {
      // Reset to the original user list
      setBusList(retrievedUsers);
    } else {
      // Filter users based on the search term
      const filteredBuses = retrievedUsers.filter(
        (bus) =>
          bus.busName.toLowerCase().includes(searchTerm) ||
          bus.routeName.toLowerCase().includes(searchTerm) ||
          bus.busNumber.toLowerCase().includes(searchTerm)
      );

      // Update bus list with matching users
      setBusList(filteredBuses);
    }
  };

  return (
    <div
      className="w-full h-screen overflow-auto"
      style={{
        background: `url(https://images.unsplash.com/photo-1607512060958-423166921a75?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="h-20 bg-[#333] mb-16">
        <h1 className="float-left mt-6 ml-8 text-2xl font-semibold text-white">
          Assign Conductors
        </h1>
      </div>
      <div className="w-full max-w-xl rounded-md mx-auto mt-10 mb-16 bg-slate-400 bg-opacity-50 p-10">
        <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-purple-100 text-lg font-bold"
        >
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Type a name..."
          value={searchTerm}
          onChange={handleSearch}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
        />
        </div>
        {busList && busList.length !== 0 ? (
          busList.map((bus) => (
            <BusAssignCard
              key={bus._id}
              busName={bus.busName}
              capacity={bus.capacity}
              busRoute={bus.routeName}
              busNumber={bus.busNumber}
              callback={renderePage}
            />
          ))
        ) : (
          <div className="text-center">
            <p className="text-3xl font-semibold text-gray-800 mb-4">
              Oops! The list is empty.
            </p>
            <p className="text-lg text-gray-600">
              Add some items to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignConductorForm;
