import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const PhotoSchema = new Schema({
    title: String,
    description:String,
    image: String,
    dateCreated: {
        type:Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo',PhotoSchema);

export default Photo;