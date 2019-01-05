import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    address : {
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
    mail : {
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
        type: [{"name":String,"from":String,"to":String,"city":String,"country":String}]
    },
    works : {
        type: [{"name":String,"from":String,"to":String,"city":String,"country":String, "position":String}]
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

export default mongoose.model('cv', cv);