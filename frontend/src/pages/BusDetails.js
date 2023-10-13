import React, { useEffect, useState } from "react";
import BusRegistrationCard from "../components/BusRegistrationCard";
import axios from "axios";

export default function BusDetails() {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/bus/all")
      .then((res) => {
        console.log(res.data);
        setBusData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {busData.map((bus) => {
        console.log(bus.busName)
        return (
          <BusRegistrationCard
            busName={bus.busName}
            busNumber={bus.busNumber}
            capacity={bus.capacity}
            busRoute={bus.routeName}
            rootDistance={bus.rootDistance}
          />
        );
      })}
    </div>
  );
}
