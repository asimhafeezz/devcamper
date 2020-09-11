"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller bootcamps
const bootcamps_1 = require("../controllers/bootcamps");
const router = express_1.default.Router();
router
    .route('/')
    .get(bootcamps_1.getBootcamps)
    .post(bootcamps_1.createBootcamp);
router
    .route('/:id')
    .get(bootcamps_1.getBootcamp)
    .put(bootcamps_1.updateBootcamp)
    .delete(bootcamps_1.deleteBootcamp);
exports.default = router;
