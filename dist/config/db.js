"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectDB = () => {
    mongoose_1.default.connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('MongoDB is connected'.cyan.underline.bold))
        .catch(err => console.log(`Mongodb is not connected says error : ${err.message}`.red.underline.bold));
};
