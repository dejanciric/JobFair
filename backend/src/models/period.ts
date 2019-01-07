import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    companiesTo:{
        type:String
    }
});

export default mongoose.model('Period', Period);