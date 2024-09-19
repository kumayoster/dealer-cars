import { default as axios } from './axiosConfig';
const API_URL = '/orders';

const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${API_URL}/${orderId}`, { status });
  return response.data;
};

export const orderService = {
  getAllOrders,
  placeOrder,
  updateOrderStatus,
};
