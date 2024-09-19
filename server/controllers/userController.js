const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ err: 'Failed to fetch users', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, role } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, username, role }
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ err: 'Failed to update user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ err: 'Failed to delete user', error });
    }
};

module.exports = { getUsers, updateUser, deleteUser };
