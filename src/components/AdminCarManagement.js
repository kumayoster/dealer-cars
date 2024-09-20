import { useEffect, useState } from 'react';
import { carService } from '../services/carService';
import './AdminCarManagement.css'; // Import your CSS file

const AdminCarManagement = () => {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({
    name: '',
    brand: '',
    prodYear: '',
    price: '',
    stock: '',
    pic: ''
  });
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await carService.getAllCars();
      setCars(response);
    };
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCar) {
      await carService.updateCar(editingCar.id, carForm);
    } else {
      await carService.addCar(carForm);
    }
    const updatedCars = await carService.getAllCars();
    setCars(updatedCars);
    setEditingCar(null);
    setCarForm({
      name: '',
      brand: '',
      prodYear: '',
      price: '',
      stock: '',
      pic: ''
    });
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setCarForm({
      name: car.name,
      brand: car.brand,
      prodYear: new Date(car.prodYear).toISOString().split('T')[0],
      price: car.price,
      stock: car.stock,
      pic: car.pic
    });
  };

  const handleDelete = async (id) => {
    await carService.deleteCar(id);
    const updatedCars = await carService.getAllCars();
    setCars(updatedCars);
  };

  return (
    <div className="container">
      <h1>Manage Cars</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <input
            type="text"
            name="name"
            value={carForm.name}
            onChange={handleInputChange}
            placeholder="Car Name"
            required
          />
          <input
            type="text"
            name="brand"
            value={carForm.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            required
          />
          <input
            type="date"
            name="prodYear"
            value={carForm.prodYear}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            value={carForm.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="stock"
            value={carForm.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
          />
          <input
            type="text"
            name="pic"
            value={carForm.pic}
            onChange={handleInputChange}
            placeholder="Picture URL"
            required
          />
        </div>
        <button type="submit">
          {editingCar ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Year</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{new Date(car.prodYear).getFullYear()}</td>
              <td>${car.price}</td>
              <td>{car.stock}</td>
              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCarManagement;
