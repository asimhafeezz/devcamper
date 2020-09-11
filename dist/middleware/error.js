"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    // //set message
    error.message = err.message;
    console.log(err);
    // mongoose bad objectId
    if (err.name === 'CastError') {
        let message = `Bootcamp not found with this id ${err.value}`;
        err = new errorResponse_1.default(message, 404);
    }
    // Mongoose Duplicate key
    if (err.code === 11000) {
        let message = 'Duplicate field value entered';
        err = new errorResponse_1.default(message, 400);
    }
    //mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        err = new errorResponse_1.default(message, 400);
    }
    res.status(err.statusCode || 500).json({
        success: false,
        err: err.message || 'Server Error'
    });
};
exports.default = errorHandler;
