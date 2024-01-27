"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPass = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const js_sha256_1 = require("js-sha256");
exports.checkPass = (0, express_async_handler_1.default)((req, res, next) => {
    const password = req.body.password;
    if (!password) {
        res.status(401).send('You dont have Access');
        return;
    }
    if ((0, js_sha256_1.sha256)(password) != '7ead1639b99511803fc6ba62741cca4864287f03a78dc7fa582c430ebb36c9db') {
        res.status(401).send('You dont have Access');
        return;
    }
    next();
});
