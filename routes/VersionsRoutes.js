"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkPassMw_1 = require("../middlewares/checkPassMw");
const VersionService_1 = require("../services/VersionService");
const router = express_1.default.Router();
router.route('/').get(VersionService_1.getVersion).patch(checkPassMw_1.checkPass, VersionService_1.updateVersion);
exports.versionRouter = router;
