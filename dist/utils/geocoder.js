"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocoder = void 0;
const node_geocoder_1 = __importDefault(require("node-geocoder"));
const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};
exports.geocoder = node_geocoder_1.default(options);
