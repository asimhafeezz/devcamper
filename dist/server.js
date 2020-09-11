"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = __importDefault(require("./middleware/error"));
const db_1 = require("./config/db");
require("colors");
//load env vars
dotenv_1.default.config({ path: './env/config.env' });
//connect database
db_1.connectDB();
//route files
const bootcamp_1 = __importDefault(require("./routes/bootcamp"));
const app = express_1.default();
//body parser
app.use(express_1.default.json());
//Dev logging middleware
process.env.NODE_ENV === 'development' && app.use(morgan_1.default('dev'));
// mount routers
app.use('/api/v1/bootcamps', bootcamp_1.default);
app.use(error_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgWhite.black));
