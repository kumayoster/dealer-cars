import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import './UserManagement.css'; // Import the custom CSS

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
        <div className="container">
            <h1>User Management</h1>

            <div>
                <h2>Users List</h2>
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        {editingUserId === user.id ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="border p-2"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={editingUser.username}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                    className="border p-2"
                                    placeholder="Username"
                                />
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    className="border p-2"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <button onClick={handleEditUser} className="save-btn">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex w-full justify-between items-center">
                                <div className="user-details">
                                    <p className="username">{user.username} <span className="name">({user.name})</span></p>
                                    <p className="role">Role: {user.role}</p>
                                </div>
                                <div className="user-actions">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="delete-btn"
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
