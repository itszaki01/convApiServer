"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubScription = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subScreptionSchema = new mongoose_1.default.Schema({
    hostName: {
        type: String,
        unique: true,
        required: true
    },
    isAgency: {
        type: Boolean,
        required: true
    },
    storeOwnerPhoneNumber: {
        type: String,
        required: true
    },
    isSubScreption: {
        type: Boolean,
        required: true
    },
    agency: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Agency'
    },
    subScriptionExpiretAt: {
        type: Date
    },
    subScriptionType: {
        type: String
    }
}, {
    timestamps: true
});
subScreptionSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("agency");
    next();
});
exports.SubScription = mongoose_1.default.model('SubScription', subScreptionSchema);
