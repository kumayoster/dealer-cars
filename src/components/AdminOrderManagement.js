import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const response = await orderService.getAllOrders();
        setOrders(response);
      };
      fetchOrders();
    } catch (error) {

    }

  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    const updatedOrders = await orderService.getAllOrders();
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Car</th>
            <th className="px-4 py-2">Tanggal Order</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-gray-100">
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.car.name}</td>
              <td className="border px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                {order.status === 0
                  ? 'Processing'
                  : order.status === 1
                    ? 'Delivering'
                    : 'Delivered'}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => updateOrderStatus(order.id, order.status + 1)}
                  disabled={order.status === 2}
                >
                  Next Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
