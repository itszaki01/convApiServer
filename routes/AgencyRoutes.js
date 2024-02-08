"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkPassMw_1 = require("../middlewares/checkPassMw");
const AgencyService_1 = require("../services/AgencyService");
const router = express_1.default.Router();
router.route('/').get(AgencyService_1.getAllAgencies).post(checkPassMw_1.checkPass, AgencyService_1.createAgency);
router.route('/:id').get(AgencyService_1.getAgencyById).patch(checkPassMw_1.checkPass, AgencyService_1.updateAgency).delete(checkPassMw_1.checkPass, AgencyService_1.deleteAgency);
exports.agencyRoutes = router;
