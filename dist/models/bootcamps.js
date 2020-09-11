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
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const geocoder_1 = require("../utils/geocoder");
const bootcampScheme = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'please add a Description'],
        maxlength: [500, 'Descriptio can not be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'please enter a valid url with http or https'
        ]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please enter a valid email address'
        ]
    },
    address: {
        type: String,
        required: [
            true,
            'please add an address'
        ]
    },
    location: {
        //geoJSON Point
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        //array of strings
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Buisness',
            'Others'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Ratting must be atleast 1'],
        max: [10, 'Ratting must can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGurrentee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
bootcampScheme.pre('save', function (next) {
    this.slug = slugify_1.default(this.name, { lower: true });
    next();
});
//Geocode& create location field
bootcampScheme.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const loc = yield geocoder_1.geocoder.geocode(this.address);
        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].stateCode,
            zipcode: loc[0].zipcode,
            country: loc[0].countryCode
        };
        console.log('location', loc);
        //dont save address
        // this.address = ''
        next();
    });
});
exports.default = mongoose_1.default.model('bootcamp', bootcampScheme);
