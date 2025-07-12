// src/components/UserList.tsx
import React, { useEffect, useState } from "react";
import { getAllUsers, User } from "../apiRequest/authenticationApi";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    getAllUsers(token)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">User List</h2>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Username</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, username, email, createdAt }) => (
                <tr key={id} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{id}</td>
                  <td className="px-6 py-4 font-medium">{username}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
