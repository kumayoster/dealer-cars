import { useState } from 'react';
import { reportService } from '../services/salesService.js';

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  const fetchSalesReport = async () => {
    const response = await reportService.getSalesReport(startDate, endDate);
    setReport(response);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sales Report</h1>

      <div className="flex space-x-4 mb-6 items-center">
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="endDate">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={fetchSalesReport}
        >
          Generate Report
        </button>
      </div>

      {report && (
        <div>
          <h2 className="text-xl font-bold mb-4">Report Summary</h2>
          <p>Total Cars Sold: {report.totalSales}</p>
          <p>Total Revenue: ${report.totalRevenue}</p>

          <table className="min-w-full bg-white border border-gray-200 mt-6">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Car</th>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Order Date</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {report.orders.map((sale, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{sale.car.name}</td>
                  <td className="py-2 px-4 border-b">{sale.user.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(sale.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{sale.car.price + '$'}</td>
                  <td className="py-2 px-4 border-b">
                    {sale.status === 1 ? 'Processed' : sale.status === 2 ? 'Shipped' : 'Completed'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
