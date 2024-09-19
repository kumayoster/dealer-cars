import { useState } from 'react';
import { authService } from '../services/authService';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        role: 'User'
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(form);
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
