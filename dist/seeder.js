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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
//load env var
dotenv_1.default.config({ path: './env/config.env' });
//load model
const bootcamps_1 = __importDefault(require("./models/bootcamps"));
//connect database
db_1.connectDB();
let oPath = path_1.default.resolve('./data/bootcamps.json');
console.log('main path', oPath);
//Read json files
const bootcamps = JSON.parse(fs_1.default.readFileSync(oPath, 'utf-8'));
//import into DB
const importData = () => {
    bootcamps_1.default.create(bootcamps)
        .then(() => {
        console.log('Data is being Imported to Database'.green.inverse);
        process.exit();
    })
        .catch((error) => console.log('error occured in importing data to Database', error.message.red.inverse));
};
//delete all data from Database
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Bootcamp.deleteMany()
    // .then(()=> {
    //     console.log('Data is being Deleted from Database'.green.inverse)
    //     process.exit()
    // })
    // .catch((error: Error)=> console.log('error occured in deleting data from Database' , error.message.red.inverse))
});
if (process.argv[2] === '-i') {
    importData();
}
else if (process.argv[2] === '-d') {
    deleteData();
}
