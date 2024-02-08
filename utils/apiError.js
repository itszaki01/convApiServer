"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    message;
    statusCode;
    status;
    isOperetional;
    constructor(message, statusCode, status, isOperetional) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
        this.isOperetional = isOperetional;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperetional = true;
    }
}
exports.ApiError = ApiError;
