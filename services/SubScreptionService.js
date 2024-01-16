"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubScreptionByHostName = exports.getSubScreptionById = exports.createNewSubScreption = exports.getAllSubScreptions = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const subScriptionModel_1 = require("../models/subScriptionModel");
exports.getAllSubScreptions = (0, express_async_handler_1.default)(async (req, res) => {
    const subScreptions = await subScriptionModel_1.SubScription.find();
    res.json({
        status: 'success',
        data: subScreptions
    });
});
exports.createNewSubScreption = (0, express_async_handler_1.default)(async (req, res) => {
    //1:create new subscreption
    const subScreption = await subScriptionModel_1.SubScription.create({ hostName: req.body.hostName });
    //2:return id & host
    res.json({
        status: 'success',
        subScreptionId: subScreption.id,
        hostName: subScreption.hostName
    });
});
exports.getSubScreptionById = (0, express_async_handler_1.default)(async (req, res, next) => {
    //1:check if subscreption is exist
    const subScreption = await subScriptionModel_1.SubScription.findById(req.params.id);
    if (!subScreption) {
        res.status(403).json({ status: 'error', message: 'You dont have access to use script' });
        return next(new Error('no access'));
    }
    res.json({
        status: 'success',
        data: {
            hostName: subScreption.hostName
        }
    });
});
exports.getSubScreptionByHostName = (0, express_async_handler_1.default)(async (req, res, next) => {
    //1:check if subscreption is exist
    const subScreption = await subScriptionModel_1.SubScription.findOne({ hostName: req.params.hostName });
    if (!subScreption) {
        res.status(403).json({ status: 'error', message: 'You dont have access to use script' });
        return next(new Error('no access'));
    }
    res.json({
        status: 'success',
        data: {
            hostName: subScreption.hostName
        }
    });
});
