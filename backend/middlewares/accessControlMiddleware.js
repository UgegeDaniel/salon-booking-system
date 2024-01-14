export const allowAdminAccessOnly = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access Forbidden. Admin access required.' });
    }
};

export const allowOnlyClientAccess = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'client') {
        next();
    } else {
        return res.status(403).json({ message: 'Access Forbidden. Client access required.' });
    }
};

export const allowAdminAndClientAccess = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'admin' || userRole === 'client') {
        next();
    } else {
        return res.status(403).json({ message: 'Access Forbidden. Admin or client access required.' });
    }
};
