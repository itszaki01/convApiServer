"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgency = exports.updateAgency = exports.createAgency = exports.getAgencyById = exports.getAllAgencies = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Agency_1 = require("../models/Agency");
exports.getAllAgencies = (0, express_async_handler_1.default)(async (req, res) => {
    const agencies = await Agency_1.Agency.find({});
    res.json({ data: agencies });
});
exports.getAgencyById = (0, express_async_handler_1.default)(async (req, res) => {
    const agency = await Agency_1.Agency.findById(req.params.id);
    if (!agency) {
        res.status(404).json({ message: `No Agency For This Id ${req.params.id}` });
        return;
    }
    res.json({ data: agency });
});
exports.createAgency = (0, express_async_handler_1.default)(async (req, res) => {
    const agency = await Agency_1.Agency.create(req.body);
    res.json({
        data: agency
    });
});
exports.updateAgency = (0, express_async_handler_1.default)(async (req, res) => {
    const agency = await Agency_1.Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agency) {
        res.status(404).json({ message: `No Agency For This Id ${req.params.id}` });
        return;
    }
    res.json({
        data: agency
    });
});
exports.deleteAgency = (0, express_async_handler_1.default)(async (req, res) => {
    const agency = await Agency_1.Agency.findByIdAndDelete(req.params.id);
    if (!agency) {
        res.status(404).json({ message: `No Agency For This Id ${req.params.id}` });
        return;
    }
    res.status(404).send('agency deleted');
});
