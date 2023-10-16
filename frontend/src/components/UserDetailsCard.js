import React from "react";

export default function UserDetailsCard({ user, onViewUser }) {
  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="mt-4 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-medium mb-2">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-700">Account Balance: {user.accountBalance}</p>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={() => onViewUser(user._id)}
        >
          View User
        </button>
      </div>
    </div>
  );
}
