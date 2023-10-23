import React from "react";
import "./BusSchedulePage.css";


const BusSchedulePage = () => {
  const routes = [
    {
      route: "ND-5689 Malabe to Kaduwela ",
      timetableData: [
        { time: "06:00 AM", direction: "Malabe to Kaduwela" },
        { time: "07:30 AM", direction: "Kaduwela to Malabe" },
        { time: "09:00 AM", direction: "Malabe to Kaduwela" },
        { time: "10:30 AM", direction: "Kaduwela to Malabe" },
        { time: "12:00 PM", direction: "Malabe to Kaduwela" },
        { time: "1:30 PM", direction: "Kaduwela to Malabe" },
        { time: "2:30 PM", direction: "Malabe to Kaduwela" },
        { time: "4:00 PM", direction: "Kaduwela to Malabe" },
        { time: "5:30 PM", direction: "Malabe to Kaduwela" },
        { time: "7:00 PM", direction: "Kaduwela to Malabe" },
      ],
    },
    {
      route: "NA-5876 Malabe to Gampaha",
      timetableData: [
        // Schedule data for Malabe to Gampaha

        { time: "06:00 AM", direction: "Malabe to Gampaha" },
        { time: "07:30 AM", direction: "Gampaha to Malabe" },
        { time: "09:00 AM", direction: "Malabe to Gampaha" },
        { time: "10:30 AM", direction: "Gampaha to Malabe" },
        { time: "12:00 PM", direction: "Malabe to Gampaha" },
        { time: "01:30 PM", direction: "Gampaha to Malabe" },
        { time: "03:00 PM", direction: "Malabe to Gampaha" },
        { time: "04:30 PM", direction: "Gampaha to Malabe" },
        { time: "06:00 PM", direction: "Malabe to Gampaha" },
        { time: "07:30 PM", direction: "Gampaha to Malabe" },
      ],
    },
    {
      route: "NB-5599 Malabe to Galle",
      timetableData: [
        // Schedule data for Malabe to Galle
       
            { time: "06:15 AM", direction: "Malabe to Galle" },
            { time: "07:45 AM", direction: "Galle to Malabe" },
            { time: "09:15 AM", direction: "Malabe to Galle" },
            { time: "10:45 AM", direction: "Galle to Malabe" },
            { time: "12:15 PM", direction: "Malabe to Galle" },
            { time: "01:45 PM", direction: "Galle to Malabe" },
            { time: "03:15 PM", direction: "Malabe to Galle" },
            { time: "04:45 PM", direction: "Galle to Malabe" },
            { time: "06:15 PM", direction: "Malabe to Galle" },
            { time: "07:45 PM", direction: "Galle to Malabe" },
        
      ],
    },
    {
      route: "NA-2149 Malabe to Kandy",
      timetableData: [
        // Schedule data for Malabe to Kandy
        { time: "06:30 AM", direction: "Malabe to Kandy" },
        { time: "08:00 AM", direction: "Kandy to Malabe" },
        { time: "09:30 AM", direction: "Malabe to Kandy" },
        { time: "11:00 AM", direction: "Kandy to Malabe" },
        { time: "12:30 PM", direction: "Malabe to Kandy" },
        { time: "02:00 PM", direction: "Kandy to Malabe" },
        { time: "03:30 PM", direction: "Malabe to Kandy" },
        { time: "05:00 PM", direction: "Kandy to Malabe" },
        { time: "06:30 PM", direction: "Malabe to Kandy" },
        { time: "08:00 PM", direction: "Kandy to Malabe" },
      ],
    },
    {
      route: "ND-5579 Malabe to Panadura",
      timetableData: [
        // Schedule data for Malabe to Panadura
        { time: "08:00 AM", direction: "Malabe to Panadura" },
        { time: "09:30 AM", direction: "Panadura to Malabe" },
        { time: "11:00 AM", direction: "Malabe to Panadura" },
        { time: "12:30 PM", direction: "Panadura to Malabe" },
        { time: "02:00 PM", direction: "Malabe to Panadura" },
        { time: "03:30 PM", direction: "Panadura to Malabe" },
        { time: "05:00 PM", direction: "Malabe to Panadura" },
        { time: "06:30 PM", direction: "Panadura to Malabe" },
      ],
    },
    {
      route: "NB-5489 Galle to Kaduwela",
      timetableData: [
        // Schedule data for Galle to Kaduwela
        { time: "08:30 AM", direction: "Galle to Kaduwela" },
        { time: "10:00 AM", direction: "Kaduwela to Galle" },
        { time: "11:30 AM", direction: "Galle to Kaduwela" },
        { time: "01:00 PM", direction: "Kaduwela to Galle" },
        { time: "02:30 PM", direction: "Galle to Kaduwela" },
        { time: "04:00 PM", direction: "Kaduwela to Galle" },
        { time: "05:30 PM", direction: "Galle to Kaduwela" },
        { time: "07:00 PM", direction: "Kaduwela to Galle" },
      ],
    },
  ];

  return (
    <div className="px-96 h-screen overflow-y-auto bg-gray-50 dark:bg-white-100">
      {routes.map((route, routeIndex) => (
        <div key={routeIndex} className="mb-16">
          <h2 className="text-2xl font-bold text-center text-indigo-600">
  Bus Timetable ({route.route})
</h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg table-animation">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark-text-gray-400">
              <tr>
  <th scope="col" className="px-6 py-3 text-white">
    Time
  </th>
  <th scope="col" className="px-6 py-3 text-white">
    <span className="text-sm">Direction</span>
  </th>
</tr>

              </thead>
              <tbody>
                {route.timetableData.map((schedule, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    }
                  >
                    <th
                      scope="row"
                      className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                        index > 0 ? "table-row-animation" : ""
                      }`}
                    >
                      {schedule.time}
                    </th>
                    <td className={`px-6 py-4 text-lg ${index > 0 ? "table-row-animation" : ""}`}>
                      {schedule.direction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusSchedulePage;