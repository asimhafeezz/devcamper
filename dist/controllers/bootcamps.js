"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBootcamp = exports.updateBootcamp = exports.createBootcamp = exports.getBootcamp = exports.getBootcamps = void 0;
const async_1 = require("../middleware/async");
// bootcamp model
const bootcamps_1 = __importDefault(require("../models/bootcamps"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    get all bootcamps
// @route   GET api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    bootcamps_1.default.find().then(data => {
        if (data.length === 0) {
            return next(new errorResponse_1.default(`No Bootcamp Found`, 404));
        }
        else {
            return res
                .status(200)
                .json({
                success: true,
                count: data.length,
                data: data
            });
        }
    })
        .catch(err => {
        next(err);
    });
};
// @desc    get a bootcamp
// @route   GET api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    bootcamps_1.default.findById(req.params.id).then(data => {
        if (!data) {
            return next(new errorResponse_1.default(`No Bootcamp found`, 404));
        }
        res
            .status(200)
            .json({
            success: true,
            data: data
        });
    })
        .catch((err) => {
        next(err);
    });
});
// @desc    create a new bootcamp
// @route   POST api/v1/bootcamps
// @access  Public
exports.createBootcamp = (req, res, next) => {
    bootcamps_1.default.create(req.body).then(data => {
        res
            .status(201)
            .json({
            success: true,
            data: data
        });
    })
        .catch((err) => next(err));
};
// @desc    update a bootcamps
// @route   PUT api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = async_1.asyncHandler(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bootCamp = yield bootcamps_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootCamp) {
            return next(new errorResponse_1.default(`did not found a bootcamp of id ${req.params.id} to update`, 404));
        }
        res
            .status(200)
            .json({
            success: true,
            data: bootCamp
        });
    });
});
// @desc    delete a bootcamp
// @route   Delete api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootCamp = yield bootcamps_1.default.findByIdAndDelete(req.params.id);
    if (!bootCamp) {
        return next(new errorResponse_1.default(`did not found a bootcamp of id ${req.params.id} to delete`, 404));
    }
    res
        .status(200)
        .json({
        success: true,
        data: bootCamp
    });
}));
