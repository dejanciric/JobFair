"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let cv = new Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    postcode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    phoneType: {
        type: String
    },
    phone: {
        type: String
    },
    mail: {
        type: String
    },
    applicationType: {
        type: String
    },
    description: {
        type: String
    },
    additionalSkillsText: {
        type: String
    },
    educations: {
        type: [{ "name": String, "from": String, "to": String, "city": String, "country": String }]
    },
    works: {
        type: [{ "name": String, "from": String, "to": String, "city": String, "country": String, "position": String }]
    },
    language1: {
        type: String
    },
    language2: {
        type: String
    },
    language3: {
        type: String
    },
    language1knowladge: {
        type: String
    },
    language2knowladge: {
        type: String
    },
    language3knowladge: {
        type: String
    }
});
exports.default = mongoose_1.default.model('cv', cv);
//# sourceMappingURL=cv.js.map