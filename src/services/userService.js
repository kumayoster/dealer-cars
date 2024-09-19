import { default as axios } from './axiosConfig';

const API_URL = '/users';

const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const updateUser = async (userId, updatedUser) => {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return response.data;
};

const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
};

const userService = { getUsers, updateUser, deleteUser };
export default userService;
