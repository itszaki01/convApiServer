"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subScreptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const SubScreptionService_1 = require("../services/SubScreptionService");
const router = express_1.default.Router();
router.route('/').get(SubScreptionService_1.getAllSubScreptions).post(SubScreptionService_1.createNewSubScreption);
router.route('/veirfy/:hostName').get(SubScreptionService_1.getSubScreptionByHostName);
router.route('/:id').get(SubScreptionService_1.getSubScreptionById);
exports.subScreptionRoutes = router;
