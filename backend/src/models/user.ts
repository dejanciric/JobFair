import mongoose from 'mongoose';
import { Int32, Long } from 'bson';

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    mail: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    type: {
        type: String
    },
    phone: {
        type: String
    },
    year:{
        type: String
    },
    graduated: {
        type: String
    },
    companyName: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    PIB: {
        type: String
    },
    employeeNumber: {
        type: String
    },
    webSite: {
        type: String
    },
    work: {
        type: String
    },
    special: {
        type: String
    }
});

export default mongoose.model('User', User);