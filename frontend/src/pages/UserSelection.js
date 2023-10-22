import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import UserDetailsCard from "../components/UserDetailsCard";
import AlertBox from "../utils/AlertBox";

Modal.setAppElement("#root"); // Set the root element for accessibility

export default function UserSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [retrievedUsers, setRetrievedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const closeAlert = () => {
    // Close the alert
    setShowAlert(false);
    handleCloseModal();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5050/users/all")
      .then((res) => {
        console.log(res.data);
        setRetrievedUsers(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // If the search term is empty, show all users
    if (!searchTerm) {
      // Reset to the original user list
      setUsers(retrievedUsers);
    } else {
      // Filter users based on the search term
      const filteredUsers = retrievedUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );

      // Update user list with matching users
      setUsers(filteredUsers);
    }
  };

  const handleViewUser = (userId) => {
    // Find the selected user
    const user = retrievedUsers.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewAccountBalance("");
  };

  const handleUpdateBalance = async () => {
    console.log(
      `Updating user with id: ${selectedUser._id} to new balance: ${newAccountBalance}`
    );
    axios
      .post("http://localhost:5050/transaction/topUpUserAccount", {
        userID: selectedUser._id,
        amount: parseFloat(newAccountBalance),
      })
      .then((res) => {
        console.log("User account topped up successfully");
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="bg-transparent h-screen overflow-auto w-full"
      style={{
        background: `url(https://cdn.pixabay.com/photo/2018/11/07/23/51/london-3801534_1280.jpg) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="h-20 bg-[#333] mb-16">
        <h1 className="float-left mt-6 ml-8 text-2xl font-semibold text-white">
          Passenger Details
        </h1>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-neutral-300 bg-opacity-50 rounded-md">
        <label
          htmlFor="search"
          className="block text-purple-900 text-lg font-bold"
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

        {/* Display user cards based on the current user list */}
        {users.map((user) => (
          <UserDetailsCard
            key={user._id}
            user={user}
            onViewUser={handleViewUser}
          />
        ))}

        {/* User Modal */}
        <Modal
          isOpen={isModalOpen}
          contentLabel="User Details Modal"
          style={{
            content: {
              width: "fit-content",
              height: "fit-content",
              margin: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          {selectedUser && (
            <div className="p-6 bg-white rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-start gap-4">
                <p className="text-gray-700">
                  Account Balance: ${selectedUser.accountBalance}
                </p>
                <div className="flex items-center gap-8">
                  <input
                    type="number"
                    placeholder="New Balance"
                    required
                    max={100000}
                    min={0}
                    value={newAccountBalance}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue <= 100000 && inputValue >= 0) {
                        setNewAccountBalance(inputValue);
                      } else {
                        setNewAccountBalance(0);
                      }
                    }}
                    className="p-2 border w-36 rounded-md focus:outline-none focus:border-blue-500"
                  />

                  {showAlert && (
                    <AlertBox message="Update complete!" onClose={closeAlert} />
                  )}
                  <button
                    onClick={handleUpdateBalance}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Update Balance
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
