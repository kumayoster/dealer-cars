
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getSales = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const query = {
            where: {
                status: 2,
            },
            include: { car: true, user: true },
        };

        if (startDate || endDate) {
            query.where.orderDate = {};

            if (startDate) {
                query.where.orderDate.gte = new Date(startDate);
            }
            if (endDate) {
                query.where.orderDate.lte = new Date(endDate);
            }
        }

        const orders = await prisma.order.findMany(query);
        const totalSales = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.car.price, 0);

        res.status(200).json({
            totalSales,
            totalRevenue,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch sales report' });
    }
};

module.exports = { getSales };
