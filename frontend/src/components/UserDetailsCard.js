import React from "react";

export default function UserDetailsCard({ user, onViewUser, onQRCode }) {
  return (
    <div className="mt-4 p-6 border rounded-md shadow-md bg-gradient-to-bl from-blue-100 to-blue-100">
      <h2 className="text-3xl font-semibold text-blue-800 mb-2">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-700 mb-4">{user.email}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-800 font-bold">
          Account Balance: ${user.accountBalance}
        </p>
        <div className="flex flex-row gap-4">
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none px-4 py-2 rounded-md"
            onClick={() => onViewUser(user._id)}
          >
            Top up
          </button>

          <button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none px-4 py-2 rounded-md"
            onClick={() => onQRCode(user._id)}
          >
            View QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
