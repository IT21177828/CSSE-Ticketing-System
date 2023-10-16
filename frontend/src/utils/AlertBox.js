import React from 'react';

const AlertBox = ({ message, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border rounded shadow-md">
      <div className="text-center">
        <p>{message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
