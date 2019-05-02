"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const result = exports.checkToken(token);
    if (result === null)
        return res.status(403).json({ error: { code: 403, message: 'You need to be authentified to access this part of the api', reason: 'Missing token' } });
    else if (result === false)
        return res.status(403).json({ error: { code: 403, message: 'You need to be authentified to access this part of the api', reason: 'Invalid or expired token' } });
    else {
        req.tokenContent = result;
        next();
    }
};
exports.checkToken = (token) => {
    if (!token)
        return null;
    try {
        const tokenContent = jwt.verify(token, process.env.JWT_SECRET);
        return tokenContent;
    }
    catch (e) {
        return false;
    }
};
