import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Slot = new Schema({
    companyName: {
        type: String
    },
    slot:{
        type: [String]
    }
});

export default mongoose.model('Slot', Slot);