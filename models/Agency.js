"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agency = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const agencySchema = new mongoose_1.default.Schema({
    agencyName: {
        type: String,
        required: true,
    },
    agencySlug: {
        type: String,
        required: true,
        unique: true,
    },
    agencyLogo: {
        type: String,
        required: true,
    },
    agencyTextColor: {
        type: String,
        required: true,
    },
    agencyBgColor: {
        type: String,
        required: true,
    },
    agencyContactFb: {
        type: String,
    },
    agencyContactWs: {
        type: String,
    },
    agencyContactInsta: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Agency = mongoose_1.default.model('Agency', agencySchema);
