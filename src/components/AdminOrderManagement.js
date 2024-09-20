import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';
import './AdminOrders.css'; // Import the custom CSS

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
      console.error("Error fetching orders:", error);
    }
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    const updatedOrders = await orderService.getAllOrders();
    setOrders(updatedOrders);
  };

  return (
    <div className="container">
      <h1>Manage Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Car</th>
            <th>Tanggal Order</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.car.name}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                {order.status === 0
                  ? 'Processing'
                  : order.status === 1
                    ? 'Delivering'
                    : 'Delivered'}
              </td>
              <td>
                <button
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
