const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getCars = async (req, res) => {
    try {
        const cars = await prisma.cars.findMany();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ err: 'Failed to fetch cars', error });
    }
};

const addCar = async (req, res) => {
    const { name, brand, prodYear, price, stock, pic } = req.body;
    try {

        const car = await prisma.cars.create({
            data: {
                name,
                brand,
                prodYear: new Date(prodYear),
                price: Number(price),
                stock: Number(stock),
                pic
            },
        });
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ err: 'Failed to add car', error });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, brand, prodYear, price, stock, pic } = req.body;
    try {
        const car = await prisma.cars.update({
            where: { id: parseInt(id) },
            data: {
                name,
                brand,
                prodYear: new Date(prodYear),
                price: Number(price),
                stock: Number(stock),
                pic
            },
        });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ err: 'Failed to update car', error });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cars.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ err: 'Failed to delete car', error });
    }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
