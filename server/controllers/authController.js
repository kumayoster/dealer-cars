const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                role
            }
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ err: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            let extra = user.role
            res.json({ token, extra });
        } else {
            res.status(401).json({ err: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ err: 'Login failed', error });
    }
};

const profile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            const user = await prisma.user.findFirstOrThrow({ where: { id: decoded.id } })
            res.json(user)
        });
    }
    catch (error) {
        res.status(500).json({ err: 'Could not get profile', error })
    }

}

module.exports = { register, login, profile };
