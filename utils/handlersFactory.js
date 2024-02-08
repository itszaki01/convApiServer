"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOne = exports.findOne = exports.updateOne = exports.createOne = exports.findAll = void 0;
const apiError_1 = require("./apiError");
const arabicName = (ModelName) => {
    let arabicName;
    if (ModelName === 'Category') {
        arabicName = 'التصنيف';
    }
    else if (ModelName === 'Location') {
        arabicName = 'المنطقة';
    }
    else if (ModelName === 'Product') {
        arabicName = 'المنتج';
    }
    else {
        arabicName = ModelName;
    }
    return arabicName;
};
const findAll = async (ModelSchema, filterObj = {}) => {
    const data = await ModelSchema.find(filterObj);
    if (!data) {
        throw new apiError_1.ApiError(`لم يتم العثور على ${arabicName(ModelSchema.modelName)}`, 404);
    }
    return data;
};
exports.findAll = findAll;
const createOne = async (ModelSchema, payload) => {
    const data = await ModelSchema.create(payload);
    if (!data) {
        throw new apiError_1.ApiError(`لم يتم إنشاء ${arabicName(ModelSchema.modelName)}`, 404);
    }
    return data;
};
exports.createOne = createOne;
const updateOne = async (ModelSchema, id, payload) => {
    const data = await ModelSchema.findByIdAndUpdate(id, payload, { new: true });
    if (!data) {
        throw new apiError_1.ApiError(`لم يتم العثور على ${arabicName(ModelSchema.modelName)}`, 404);
    }
    return data;
};
exports.updateOne = updateOne;
const findOne = async (ModelSchema, payload, findType) => {
    let data;
    if (findType === "payload") {
        data = await ModelSchema.findOne(payload);
    }
    else {
        data = await ModelSchema.findById(payload);
        if (!data) {
            throw new apiError_1.ApiError(`لم يتم العثور على ${arabicName(ModelSchema.modelName)}`, 404);
        }
    }
    return data;
};
exports.findOne = findOne;
const removeOne = async (ModelSchema, id) => {
    const data = await ModelSchema.findByIdAndDelete(id);
    if (!data) {
        throw new apiError_1.ApiError(`لم يتم العثور على ${arabicName(ModelSchema.modelName)}`, 404);
    }
    return `تم حذف ${arabicName(ModelSchema.modelName)} بنجاح`;
};
exports.removeOne = removeOne;
