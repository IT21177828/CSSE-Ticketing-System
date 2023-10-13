import React from 'react';


const BusRegistrationCard = (props) => {
  // Sample bus registration data
  console.log({props})
  const {busName, busNumber, capacity, busRoute, rootDistance} = props;



  return (
    <div className="flex justify-center min-h-fit mb-14">
      <div className="w-full max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bus Details</h2>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {busName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bus Number: {busNumber}
                  </p>
                </div>
                <div className="inline-flex items-center text-lg font-semibold text-indigo-500">
                  Capacity: {capacity}
                </div>
              </div>
            </li>
            {/* Add similar list items for other fields */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusRegistrationCard;