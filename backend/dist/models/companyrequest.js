"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CompanyRequest = new Schema({
    companyName: {
        type: String
    },
    title: {
        type: String
    },
    result: {
        type: String
    },
    comment: {
        type: String
    }
});
exports.default = mongoose_1.default.model('CompanyRequest', CompanyRequest);
//# sourceMappingURL=companyrequest.js.map