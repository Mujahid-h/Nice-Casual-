import React from "react";
import { MdDelete } from "react-icons/md";
import Spinner from "../Spinner";

const UsersTable = ({ users, loadingUsers, handleDeleteUser }) => {
  return (
    <div className="overflow-x-auto w-full lg:w-5/6 mx-auto">
      <h2 className="text-gray-800 font-bold mb-4 text-xl text-center">
        Users
      </h2>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <table className="w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4 border text-center font-semibold">
                Name
              </th>
              <th className="py-2 px-4 border text-center font-semibold">
                Email
              </th>
              <th className="py-2 px-4 border text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-indigo-100">
                <td className="py-2 px-4 border text-center">{user.name}</td>
                <td className="py-2 px-4 border text-center">{user.email}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
