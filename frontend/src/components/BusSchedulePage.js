import React from "react";

const BusSchedulePage = () => {

    
  const routes = [
    { route: "Malabe to Kaduwela ND-5689", timetableData: [
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
      
    ] },
    { route: "Malabe to Gampaha", timetableData: [
      // Schedule data for Malabe to Gampaha

      { time: "06:00 AM", direction: "Malabe to Gampaha" },
      { time: "07:30 AM", direction: "Gampaha to Malabe" },
      { time: "09:00 AM", direction: "Malabe to Kaduwela" },
      { time: "10:30 AM", direction: "Gampaha to Malabe" },
      { time: "12:00 PM", direction: "Malabe to Gampaha" },
      { time: "1:30 PM", direction: "Gampaha to Malabe" },
      { time: "2:30 PM", direction: "Malabe to Gampaha" },
      { time: "4:00 PM", direction: "Gampaha to Malabe" },
      { time: "5:30 PM", direction: "Malabe to Gampaha" },
      { time: "7:00 PM", direction: "Gampaha to Malabe" },
    ] },
    { route: "Malabe to Galle", timetableData: [
      // Schedule data for Malabe to Galle
      { time: "06:00 AM", direction: "Malabe to Galle" },
      { time: "07:30 AM", direction: "Galle to Malabe" },
      { time: "09:00 AM", direction: "Malabe to Galle" },
      { time: "10:30 AM", direction: "Galle to Malabe" },
      { time: "12:00 PM", direction: "Malabe to Galle" },
      { time: "1:30 PM", direction: "Galle to Malabe" },
      { time: "2:30 PM", direction: "Malabe to Galle" },
      { time: "4:00 PM", direction: "Galle to Malabe" },
      { time: "5:30 PM", direction: "Malabe to Galle" },
      { time: "7:00 PM", direction: "Galle to Malabe" },
    ] },
    { route: "Malabe to Kandy", timetableData: [
      // Schedule data for Malabe to Kandy
      { time: "06:00 AM", direction: "Malabe to Kandy" },
      { time: "07:30 AM", direction: "Kandy to Malabe" },
      { time: "09:00 AM", direction: "Malabe to Kandy" },
      { time: "10:30 AM", direction: "Kandy to Malabe" },
      { time: "12:00 PM", direction: "Malabe to Kandy" },
      { time: "1:30 PM", direction: "Kandy to Malabe" },
      { time: "2:30 PM", direction: "Malabe to Kandy" },
      { time: "4:00 PM", direction: "Kandy to Malabe" },
      { time: "5:30 PM", direction: "Malabe to Kandy" },
      { time: "7:00 PM", direction: "Kandy to Malabe" },
    ] },
    { route: "Malabe to Panadura", timetableData: [
      // Schedule data for Malabe to Panadura
      { time: "06:00 AM", direction: "Malabe to Panadura" },
      { time: "07:30 AM", direction: "Panadura to Malabe" },
      { time: "09:00 AM", direction: "Malabe to Panadura" },
      { time: "10:30 AM", direction: "Panadura to Malabe" },
      { time: "12:00 PM", direction: "Malabe to Panadura" },
      { time: "1:30 PM", direction: "Panadura to Malabe" },
      { time: "2:30 PM", direction: "Malabe to Panadura" },
      { time: "4:00 PM", direction: "Panadura to Malabe" },
      { time: "5:30 PM", direction: "Malabe to Panadura" },
      { time: "7:00 PM", direction: "Panadura to Malabe" },
    ] },
    { route: "Galle to Kaduwela", timetableData: [
      // Schedule data for Galle to Kaduwela
      { time: "06:00 AM", direction: "Galle to Kaduwela" },
      { time: "07:30 AM", direction: "Kaduwela to Galle" },
      { time: "09:00 AM", direction: "Galle to Kaduwela" },
      { time: "10:30 AM", direction: "Kaduwela to Galle" },
      { time: "12:00 PM", direction: "Galle to Kaduwela" },
      { time: "1:30 PM", direction: "Kaduwela to Galle" },
      { time: "2:30 PM", direction: "Galle to Kaduwela" },
      { time: "4:00 PM", direction: "Kaduwela to Galle" },
      { time: "5:30 PM", direction: "Galle to Kaduwela" },
      { time: "7:00 PM", direction: "Kaduwela to Galle" },
    ] },
  ];

  return (
    <div className="px-96">
      {routes.map((route, routeIndex) => (
        <div key={routeIndex} className="mb-16">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Bus Timetable ({route.route})
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark-text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-lg">Direction</span>
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
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {schedule.time}
                    </th>
                    <td className="px-6 py-4 text-lg">{schedule.direction}</td>
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