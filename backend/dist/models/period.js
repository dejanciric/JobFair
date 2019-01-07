"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Period = new Schema({
    studentsFrom: {
        type: String
    },
    studentsTo: {
        type: String
    },
    companiesFrom: {
        type: String
    },
    companiesTo: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Period', Period);
//# sourceMappingURL=period.js.map