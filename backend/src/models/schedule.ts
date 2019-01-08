import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Schedule = new Schema({
    companies: {
        type: [String]
    }
});

export default mongoose.model('Schedule', Schedule);