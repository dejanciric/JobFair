import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CompanyRequest = new Schema({
    companyName: {
        type: String
    },
    title: {
        type: String
    },
    result: {
        type: String
    },
    comment:{
        type:String
    }
});

export default mongoose.model('CompanyRequest', CompanyRequest);