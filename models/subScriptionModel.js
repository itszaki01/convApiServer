"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubScription = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subScreptionSchema = new mongoose_1.default.Schema({
    hostName: {
        type: 'String',
        unique: true
    }
}, {
    timestamps: true
});
exports.SubScription = mongoose_1.default.model('SubScription', subScreptionSchema);
