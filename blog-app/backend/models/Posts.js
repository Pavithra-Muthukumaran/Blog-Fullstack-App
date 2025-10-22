import mongoose from 'mongoose';

const PostSchema  = new mongoose.Schema({
    title:{type : String, required : true},
    body : {type : String, required : true},
    author : {type : mongoose.Schema.ObjectId, ref : 'User', required : true},
    tags : [String],
}, {timestamps : true});

export default mongoose.model('Post',PostSchema);