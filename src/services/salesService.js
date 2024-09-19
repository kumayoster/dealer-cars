import { default as axios } from './axiosConfig';
const API_URL = '/sales';

const getSalesReport = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const reportService = {
  getSalesReport,
};
