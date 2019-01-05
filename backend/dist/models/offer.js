"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Offer = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    type: {
        type: String
    },
    content: {
        type: String
    },
    companyUsername: {
        type: String
    },
    deadline: {
        type: String
    },
    students: {
        type: [{ "username": String, "firstname": String, "lastname": String, "result": String }]
    }
});
exports.default = mongoose_1.default.model('Offer', Offer);
//# sourceMappingURL=offer.js.map