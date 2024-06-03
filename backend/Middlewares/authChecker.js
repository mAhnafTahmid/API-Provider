import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const extractTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        return token;
    }
    return null;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

export const authenticateToken = (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) {
        return res.status(401).send('Unauthorized: Missing or invalid token');
    }
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
    req.user = decodedToken;
    next();
};
