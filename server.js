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
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_useragent_1.default.express());
app.post("/fb-api", (0, express_async_handler_1.default)(async (req, res) => {
    console.log(req.protocol);
    const access_token = req.body.fbApiToken;
    const pixel_id = req.body.pixelId;
    const api = bizSdk.FacebookAdsApi.init(access_token);
    let current_timestamp = Math.floor(Date.now() / 1000);
    const userData = new UserData().setPhones([req.body.clientPhoneNumber]);
    // It is recommended to send Client IP and User Agent for Conversions API Events.
    if (req.ip)
        userData.setClientIpAddress(req.ip);
    if (req.useragent)
        userData.setClientUserAgent(JSON.stringify(req.useragent));
    if (req.body.fbp)
        userData.setFbp(req.body.fbp);
    if (req.body.fbc)
        userData.setFbc(req.body.fbc);
    const content = new Content().setId("product123").setQuantity(1).setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);
    const customData = new CustomData().setContents([content]).setCurrency("usd").setValue(123.45);
    const serverEvent = new ServerEvent()
        .setEventName("Purchase")
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setCustomData(customData)
        .setEventSourceUrl(req.body.eventSourceUrl)
        .setActionSource("website");
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
    try {
        await eventRequest.execute();
        res.json({ status: "succes", message: "Fb Api Service Working" });
    }
    catch (_error) {
        const error = _error;
        res.status(505).json({ status: "error", message: "somthing wrong", error: error.message, stack: error.stack });
    }
}));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server Listen on port ", PORT);
});
