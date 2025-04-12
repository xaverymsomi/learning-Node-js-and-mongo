const { constants } = require("../constants").constants;

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    
    const errorTitles = {
        400: "Validation Failed",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Server Error"
    };

    res.status(statusCode).json({
        title: errorTitles[statusCode] || "Error",
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;