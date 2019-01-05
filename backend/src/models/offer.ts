import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    companyName: {
        type: String
    },
    companyUsername: {
        type: String
    },
    deadline: {
        type: String
    },
    students: {
        type:[{"username":String, "firstname":String, "lastname":String, "result":String}]
    }
});

export default mongoose.model('Offer', Offer);