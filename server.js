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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bizSdk = __importStar(require("facebook-nodejs-business-sdk"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const requestIp = __importStar(require("request-ip"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const js_sha256_1 = require("js-sha256");
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_useragent_1.default.express());
app.use(requestIp.mw());
//allow other domains to access the api
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.post("/fb-api", (0, express_async_handler_1.default)(async (req, res) => {
    const access_token = req.body.access_token;
    const pixel_id = req.body.pixelId;
    const api = bizSdk.FacebookAdsApi.init(access_token);
    let current_timestamp = Math.floor(Date.now() / 1000);
    const userData = new UserData().setPhone(req.body.phoneNumber);
    // It is recommended to send Client IP and User Agent for Conversions API Events.
    if (req.clientIp)
        userData.setClientIpAddress(req.clientIp);
    if (req.body.userAgent)
        userData.setClientUserAgent(req.body.userAgent);
    if (req.body.fbp)
        userData.setFbp(req.body.fbp);
    if (req.body.fbc)
        userData.setFbc(req.body.fbc);
    const content = new Content()
        .setId(req.body.productId)
        .setQuantity(req.body.quantity)
        .setDeliveryCategory(req.body.shippingType === "للمكتب" ? DeliveryCategory.CURBSIDE : DeliveryCategory.HOME_DELIVERY)
        .setItemPrice(req.body.productPrice)
        .setTitle(req.body.productName);
    const customData = new CustomData().setContents([content]).setCurrency(req.body.currencyCode).setValue(req.body.totalPrice);
    const serverEvent = new ServerEvent()
        .setEventName("Purchase")
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setCustomData(customData)
        .setEventSourceUrl(req.body.eventSourceUrl)
        .setActionSource("website")
        .setEventId(`${req.body.productId}${req.body.phoneNumber}`);
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
    if (req.body.allowTestMode)
        eventRequest.setTestEventCode(req.body.testCode);
    try {
        await eventRequest.execute();
        res.json({ status: "succes" });
    }
    catch (_error) {
        const error = _error;
        res.status(505).json({ status: "error", message: "somthing wrong", error: error.message });
    }
}));
app.post("/tiktopApi", (0, express_async_handler_1.default)(async (req, res) => {
    const headers = {
        "Access-Token": req.body.access_token,
        "Content-Type": "application/json",
    };
    console.log(`${req.protocol}://${req.hostname}`);
    let data = {
        pixel_code: req.body.pixelId,
        event: "CompletePayment",
        event_id: `${req.body.productId}${req.body.phoneNumber}`,
        timestamp: new Date(),
        context: {
            page: {
                url: req.body.eventSourceUrl,
                referrer: `${req.protocol}://${req.hostname}`,
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
}));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server Listen on port ", PORT);
});
