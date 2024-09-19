const jwt = require('jsonwebtoken');

const roleMiddleware = (allowedRoles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, have you logged in?' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token, expired?', err });
        }

        if (allowedRoles.includes(decoded.role)) {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    });
};

module.exports = roleMiddleware;
