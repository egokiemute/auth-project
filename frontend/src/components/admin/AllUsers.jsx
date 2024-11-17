import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

const AllUsers = () => {
  // Sample user data
  const users = [
    {
      id: 1,
      name: "Gold Nelson",
      email: "gold.nelson@hotmail.com",
      phone: "+234 913 302 0570",
      nin: "39134905653",
      userType: "User",
      image: "/assets/user1.png",
    },
    {
      id: 2,
      name: "Mary Sokoh",
      email: "mary.sokoh@yahoo.com",
      phone: "+234 915 100 5354",
      nin: "59146111763",
      userType: "Host",
      image: "/assets/user2.png",
    },
    {
      id: 3,
      name: "Modupe Ogunleye",
      email: "modupe.ogunleye@protonmail.com",
      phone: "+234 818 012 5055",
      nin: "78103430607",
      userType: "Host",
      image: "/assets/user1.png",
    },
    {
      id: 4,
      name: "Bolaji Babalola",
      email: "balaji.babalola@outlook.com",
      phone: "+234 907 437 2151",
      nin: "98029257138",
      userType: "Host",
      image: "/assets/user2.png",
    },
    {
      id: 5,
      name: "Chidera Nwayemike",
      email: "chidera.nwayemike@gmail.com",
      phone: "+234 918 387 2823",
      nin: "18026385981",
      userType: "User",
      image: "/assets/user1.png",
    },
    {
      id: 6,
      name: "Adeola Folarin",
      email: "adeola.folarin@yandex.com",
      phone: "+234 811 764 3167",
      nin: "48119196378",
      userType: "User",
      image: "/assets/user2.png",
    },
    {
      id: 7,
      name: "Oke Gift",
      email: "oke.gift@zoho.com",
      phone: "+234 909 660 8841",
      nin: "28190000728",
      userType: "Host",
      image: "/assets/user1.png",
    },
  ];

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((user) => user.id) : []
                    )
                  }
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">NIN</th>
              <th className="py-2 px-4 border-b">User Type</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(user.id)}
                    checked={selectedUsers.includes(user.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.nin}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.userType === "Host"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.userType}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-gray-500 hover:text-black">
                  <ChevronRight className="size-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </p>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(users.length / usersPerPage))
            )
          }
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          className={`px-4 py-2 rounded-md ${
            currentPage === Math.ceil(users.length / usersPerPage)
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
