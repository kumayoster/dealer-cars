import { useEffect, useState } from 'react';
import { carService } from '../services/carService';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const CarCatalog = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    prodYear: '',
    price: '',
  });

  useEffect(() => {
    const fetchCars = async () => {
      const response = await carService.getAllCars();
      setCars(response);
    };
    fetchCars();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleOrder = async (carId, carName) => {
    const response = await authService.getCurrentUser();
    const user = response.user;
    try {
      const orderData = {
        carId,
        userId: user.id,
        customer: user.username,
        orderDate: new Date(),
        status: 0,
      };
      await orderService.placeOrder(orderData);
      alert(`Order placed successfully for ${carName}`);
    } catch (err) {
      console.error('Order creation error:', err);
      setError('Error placing the order');
      alert(`There has been an error in placing your order: ${error}`);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const filteredCars = cars.filter((car) => {
    return (
      (!filters.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (!filters.prodYear || new Date(car.prodYear).getFullYear() === parseInt(filters.prodYear)) &&
      (!filters.price || car.price <= parseInt(filters.price))
    );
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleProfileClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Profile
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Car Catalog</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          placeholder="Search by Brand"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="prodYear"
          value={filters.prodYear}
          onChange={handleFilterChange}
          placeholder="Search by Production Year"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow">
            <img src={car.pic} alt={car.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p>Brand: {car.brand}</p>
            <p>Year: {new Date(car.prodYear).getFullYear()}</p>
            <p>Price: ${car.price}</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleOrder(car.id, car.name)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCatalog;
