"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressErrorHandler = void 0;
const expressErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (err.message.includes('duplicate key error collection')) {
        err.message = "Duplicate key error, please try again with another value";
    }
    if (process.env.NODE_ENV?.startsWith("DEV")) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack,
        });
    }
    else {
        if (err.message.includes("token") || err.message.includes("jwt") || err.message.includes("signature")) {
            err.message = "Invalid Token, Please login to get access";
        }
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};
exports.expressErrorHandler = expressErrorHandler;
