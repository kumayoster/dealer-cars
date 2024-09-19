import { useEffect, useState } from 'react';
import {carService} from '../services/carService';

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
      prodYear: new Date(car.prodYear).toISOString().split('T')[0], // Format date for input
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tambah Cars</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={carForm.name}
            onChange={handleInputChange}
            placeholder="Car Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="brand"
            value={carForm.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="prodYear"
            value={carForm.prodYear}
            onChange={handleInputChange}
            placeholder="Production Year"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={carForm.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={carForm.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="pic"
            value={carForm.pic}
            onChange={handleInputChange}
            placeholder="Picture URL"
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {editingCar ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Kode Mobil</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Tahun</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="bg-gray-100">
              <td className="border px-4 py-2">{car.id}</td>
              <td className="border px-4 py-2">{car.name}</td>
              <td className="border px-4 py-2">{car.brand}</td>
              <td className="border px-4 py-2">{new Date(car.prodYear).getFullYear()}</td>
              <td className="border px-4 py-2">${car.price}</td>
              <td className="border px-4 py-2">{car.stock}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
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
