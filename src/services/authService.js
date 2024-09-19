import { default as axios } from './axiosConfig';
const API_URL = '/auth';  // Assuming your backend exposes an auth endpoint

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, username, password);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return { token: response.data.token, role: response.data.extra };
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/profile`)
  return { user: response.data }
};

const authStatus = () => {
  return localStorage.getItem('token');
};

export const authService = {
  login,
  logout,
  getCurrentUser,
  register,
  authStatus
};
