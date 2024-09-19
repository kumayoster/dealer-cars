import { default as axios } from './axiosConfig';
const API_URL = '/cars';

const getAllCars = async (filters) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};

const addCar = async (carData) => {
  const response = await axios.post(API_URL, carData);
  return response.data;
};

const updateCar = async (carId, carData) => {
  const response = await axios.put(`${API_URL}/${carId}`, carData);
  return response.data;
};

const deleteCar = async (carId) => {
  const response = await axios.delete(`${API_URL}/${carId}`);
  return response.data;
};

export const carService = {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
};
