import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authService.getCurrentUser();
                const user = response.user
                setUserData({
                    name: user.name,
                    username: user.username,
                });
            } catch (err) {
                setError('Failed to load profile information.\n' + err);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-2xl font-bold mb-6">Profile</h2>
                    {error && <p className="text-red-500 text-center bg-red-100 shadow-md rounded pt-3 pb-3">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {userData.name}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {userData.username}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
