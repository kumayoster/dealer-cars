import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({ name: '', username: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await userService.getUsers();
        setUsers(data);
    };

    const handleDeleteUser = async (userId) => {
        await userService.deleteUser(userId);
        fetchUsers();
    };

    const handleEditUser = async () => {
        await userService.updateUser(editingUserId, editingUser);
        setEditingUserId(null);
        fetchUsers();
    };

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setEditingUser({ name: user.name, username: user.username, role: user.role });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Management</h1>

            <div>
                <h2 className="font-semibold text-lg text-gray-700 mb-4">Users List</h2>
                {users.map((user) => (
                    <div key={user.id} className="flex justify-between p-4 items-center bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200">
                        {editingUserId === user.id ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={editingUser.username}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                                    placeholder="Username"
                                />
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <button onClick={handleEditUser} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex w-full justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-800">{user.username} <span className="text-gray-600">({user.name})</span></p>
                                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
