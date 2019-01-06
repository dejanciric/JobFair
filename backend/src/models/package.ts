import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Package = new Schema({
    packages: {
        type: [{"Title":String, "Content":[String], "VideoPromotion":Number, "NoLessons":Number, "NoWorkchops":Number, "NoPresentation":Number, "Price":Number, "MaxCompanies":Number}]
    },
    additionals: {
        type: [{"Title":String, "Price":Number}]
    }
});

export default mongoose.model('Package', Package);