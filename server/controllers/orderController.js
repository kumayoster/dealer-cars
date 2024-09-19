const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const placeOrder = async (req, res) => {
    const { carId, userId, customer, orderDate, status } = req.body;
    try {
        const getStock = await prisma.cars.findFirst({
            where: { id: carId },
            select: { stock: true }
        })
        const curStock = getStock.stock
        if (curStock <= 0) {
            res.status(409).json({
                msg: 'out of stock'
            })
            return
        }
        const order = await prisma.order.create({
            data: {
                customer,
                orderDate: new Date(orderDate),
                status,
                car: {
                    connect: { id: carId }
                },
                user: {
                    connect: { id: userId }
                },
            }
        });

        await prisma.cars.update({ where: { id: carId }, data: { stock: curStock - 1 } })
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ err: 'Failed to place order ', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany(
            {
                include:
                {
                    car: true,
                    user: true
                }
            });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ err: 'Failed to fetch orders', error });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ err: 'Failed to update order status', error });
    }
};

module.exports = { placeOrder, getOrders, updateOrder };
