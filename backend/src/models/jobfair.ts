
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Jobfair', Jobfair);