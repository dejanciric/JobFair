"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Jobfair = new Schema({
    Fair: {
        type: String
    },
    StartDate: {
        type: String
    },
    EndDate: {
        type: String
    },
    StartTime: {
        type: String
    },
    EndTime: {
        type: String
    },
    Place: {
        type: String
    },
    About: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Jobfair', Jobfair);
//# sourceMappingURL=jobfair.js.map