import { useEffect, useState } from 'react';
import { carService } from '../services/carService';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './CarCatalog.css'; // Importing the CSS file

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
    <div className="car-catalog-container">
      <div className="profile-btn-container">
        <button onClick={handleProfileClick} className="btn-profile">
          Profile
        </button>
      </div>

      <h1 className="catalog-title">Car Catalog</h1>

      <div className="filter-container">
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          placeholder="Search by Brand"
          className="filter-input"
        />
        <input
          type="number"
          name="prodYear"
          value={filters.prodYear}
          onChange={handleFilterChange}
          placeholder="Search by Production Year"
          className="filter-input"
        />
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="filter-input"
        />
      </div>

      <div className="cars-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.pic} alt={car.name} className="car-image" />
            <h2 className="car-name">{car.name}</h2>
            <p>Brand: {car.brand}</p>
            <p>Year: {new Date(car.prodYear).getFullYear()}</p>
            <p>Price: ${car.price}</p>
            <button className="btn-order" onClick={() => handleOrder(car.id, car.name)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCatalog;
