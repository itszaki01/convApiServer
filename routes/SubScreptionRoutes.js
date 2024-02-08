"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subScreptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const SubScreptionService_1 = require("../services/SubScreptionService");
const checkPassMw_1 = require("../middlewares/checkPassMw");
const router = express_1.default.Router();
router.route('/').get(SubScreptionService_1.getAllSubScreptions).post(checkPassMw_1.checkPass, SubScreptionService_1.createNewSubScreption);
router.route('/verify/:hostName').get(SubScreptionService_1.getSubScreptionByHostName);
router.route('/agency/:agencyId').get(SubScreptionService_1.getAllSubScreptionsByAgencyId);
router.route('/:id').get(SubScreptionService_1.getSubScreptionById);
exports.subScreptionRoutes = router;
