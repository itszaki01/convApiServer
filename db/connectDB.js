"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_URI);
        console.log('DB CONNECTED SUCCESS');
    }
    catch (error) {
        const _error = error;
        console.log('DB CONNECTION ERROR ', _error.message);
    }
};
exports.connectDb = connectDb;
