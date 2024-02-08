"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route404Hanlder = void 0;
const apiError_1 = require("../utils/apiError");
const route404Hanlder = (req, res, next) => {
    // const err = new Error(`Can't find this route => ${req.originalUrl}`)
    next(new apiError_1.ApiError(`Can't find this route => ${req.originalUrl}`, 400));
};
exports.route404Hanlder = route404Hanlder;
