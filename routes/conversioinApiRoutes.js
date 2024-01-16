"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionApiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facebookApiService_1 = require("../services/facebookApiService");
const tikTokApiService_1 = require("../services/tikTokApiService");
const router = express_1.default.Router();
router.route('/fb-api').post(facebookApiService_1.facebookApiService);
router.route('/tiktokApi').post(tikTokApiService_1.tiktokApiService);
exports.conversionApiRoutes = router;
