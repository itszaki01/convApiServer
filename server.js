"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const requestIp = __importStar(require("request-ip"));
const cors_1 = __importDefault(require("cors"));
const conversioinApiRoutes_1 = require("./routes/conversioinApiRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./db/connectDB");
const SubScreptionRoutes_1 = require("./routes/SubScreptionRoutes");
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
(0, connectDB_1.connectDb)();
app.use(express_1.default.json());
app.use(express_useragent_1.default.express());
app.use(requestIp.mw());
//allow other domains to access the api
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use('/conv-api', conversioinApiRoutes_1.conversionApiRoutes);
app.use('/subScreptions', SubScreptionRoutes_1.subScreptionRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server Listen on port ", PORT);
});
