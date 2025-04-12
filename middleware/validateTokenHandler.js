const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    // Check if authorization header exists and has Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is required"
        });
    }

    // Extract token
    token = authHeader.split(" ")[1];
    
    // Verify token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing from Authorization header"
        });
    }

    // Verify token validity
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        
        // Attach user to request and continue
        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;