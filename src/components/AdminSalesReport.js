import { useState } from 'react';
import { reportService } from '../services/salesService.js';
import './SalesReport.css'; // Import your custom CSS file

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  const fetchSalesReport = async () => {
    const response = await reportService.getSalesReport(startDate, endDate);
    setReport(response);
  };

  return (
    <div className="container">
      <h1>Sales Report</h1>

      <div className="flex">
        <div className="flex-col">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex-col">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button onClick={fetchSalesReport}>
          Generate Report
        </button>
      </div>

      {report && (
        <div>
          <h2>Report Summary</h2>
          <p>Total Cars Sold: {report.totalSales}</p>
          <p>Total Revenue: ${report.totalRevenue}</p>

          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {report.orders.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.car.name}</td>
                  <td>{sale.user.name}</td>
                  <td>{new Date(sale.orderDate).toLocaleDateString()}</td>
                  <td className="price">{sale.car.price + '$'}</td>
                  <td>
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
