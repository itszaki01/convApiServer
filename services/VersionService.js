"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVersion = exports.getVersion = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Versions_1 = require("../models/Versions");
exports.getVersion = (0, express_async_handler_1.default)(async (req, res) => {
    const version = await Versions_1.Version.findById("65b4e65e405126ffc4d2a6d5");
    if (!version) {
        res.status(505).send("wrong id");
    }
    res.json({ data: version });
});
exports.updateVersion = (0, express_async_handler_1.default)(async (req, res) => {
    const version = await Versions_1.Version.findByIdAndUpdate("65b4e65e405126ffc4d2a6d5", req.body);
    if (!version) {
        res.status(505).send("wrong id");
    }
    res.json({ stats: "Version Updated" });
});
