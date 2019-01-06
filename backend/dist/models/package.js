"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Package = new Schema({
    packages: {
        type: [{ "Title": String, "Content": [String], "VideoPromotion": Number, "NoLessons": Number, "NoWorkchops": Number, "NoPresentation": Number, "Price": Number, "MaxCompanies": Number }]
    },
    additionals: {
        type: [{ "Title": String, "Price": Number }]
    }
});
exports.default = mongoose_1.default.model('Package', Package);
//# sourceMappingURL=package.js.map