"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiktokApiService = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const js_sha256_1 = require("js-sha256");
const axios_1 = __importDefault(require("axios"));
exports.tiktokApiService = (0, express_async_handler_1.default)(async (req, res) => {
    const headers = {
        "Access-Token": req.body.access_token,
        "Content-Type": "application/json",
    };
    let data = {
        pixel_code: req.body.pixelId,
        event: "CompletePayment",
        event_id: `${req.body.productId}${req.body.phoneNumber}`,
        timestamp: new Date(),
        context: {
            page: {
                url: req.body.eventSourceUrl,
                referrer: req.body.hostName,
            },
            user: {
                external_id: (0, js_sha256_1.sha256)(`${req.body.productId}${req.body.phoneNumber}`),
                phone_number: (0, js_sha256_1.sha256)(`+${req.body.phoneNumber}`),
            },
            user_agent: req.body.userAgent,
            ip: req.clientIp,
        },
        properties: {
            contents: [
                {
                    price: req.body.productPrice,
                    quantity: req.body.quantity,
                    content_type: "product",
                    content_id: req.body.productId,
                    content_name: req.body.productName,
                },
            ],
            currency: req.body.currencyCode,
            value: req.body.totalPrice,
        },
    };
    //@ts-ignore
    if (req.body.ttclid)
        data = { ...data, context: { ...data.context, ad: { callback: req.body.ttclid } } };
    //@ts-ignore
    if (req.body.ttp)
        data = { ...data, context: { ...data.context, user: { ...data.context.user, ttp: req.body.ttp } } };
    //@ts-ignore
    if (req.body.allowTestMode)
        data = { ...data, test_event_code: req.body.testCode };
    try {
        await axios_1.default.post("https://business-api.tiktok.com/open_api/v1.2/pixel/track/", data, { headers });
        res.json({ status: "succes" });
    }
    catch (_error) {
        const error = _error;
        res.status(505).json({ status: "error", message: "somthing wrong", error: error.message });
    }
});
