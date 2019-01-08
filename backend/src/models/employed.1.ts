import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Employed = new Schema({
    username: {
        type: String
    },
    companyName: {
        type: String
    },
    date: {
        type: String
    },
    type: {
        type: String
    }
});

export default mongoose.model('Employed', Employed);