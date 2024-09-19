import React from 'react';
import AdminCarManagement from '../components/AdminCarManagement.js';
import AdminOrders from '../components/AdminOrderManagement.js';
import SalesReport from '../components/AdminSalesReport.js';
import AdminUserManagement from '../components/AdminUserManagement.js';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState('cars');

  const renderContent = () => {
    switch (selectedTab) {
      case 'users':
        return <AdminUserManagement />;
      case 'cars':
        return <AdminCarManagement />;
      case 'orders':
        return <AdminOrders />;
      case 'sales':
        return <SalesReport />;
      default:
        return <AdminUserManagement />;
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Admin Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`${selectedTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring focus:ring-blue-300`}
          onClick={() => setSelectedTab('users')}
        >
          User Management
        </button>
        <button
          className={`${selectedTab === 'cars' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring focus:ring-blue-300`}
          onClick={() => setSelectedTab('cars')}
        >
          Car Management
        </button>
        <button
          className={`${selectedTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring focus:ring-blue-300`}
          onClick={() => setSelectedTab('orders')}
        >
          Order Management
        </button>
        <button
          className={`${selectedTab === 'sales' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring focus:ring-blue-300`}
          onClick={() => setSelectedTab('sales')}
        >
          Sales Report
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
