const authSimulation = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    req.user = {
        role: userRole,
        id: userId
    };

    next();
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
};

const isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied. User role required.' });
    }
    if (!req.user.id) {
        return res.status(400).json({ message: 'User ID is missing in headers.' });
    }
    next();
};

module.exports = { authSimulation, isAdmin, isUser };
