import axios from "axios";
import React, { useState, useEffect } from "react";
import BusAssignCard from "./BusAssignCard";

const AssignConductorForm = () => {
  const [busList, setBusList] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5050/bus/free")
      .then((res) => {
        console.log(res.data);

        setBusList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const renderePage = () => {
    setRender(!render);
  };

  return (
    <div>
      <div className="h-20 bg-[#333] mb-16">
        <h1 className="float-left mt-6 ml-8 text-2xl font-semibold text-white">
          Assign Conductors
        </h1>
      </div>
      <div className="w-full max-w-md mx-auto mt-10">
        {busList && busList.length !== 0 ? (
          busList.map((bus) => {
            return (
              <BusAssignCard
                key={bus._id}
                busName={bus.busName}
                capacity={bus.capacity}
                busRoute={bus.routeName}
                busNumber={bus.busNumber}
                callback={renderePage}
              />
            );
          })
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
