import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    post : {type : mongoose.Schema.ObjectId, ref : 'Posts', required : true},
    author : {type : mongoose.Schema.ObjectId, ref : 'User', required : true},
    content : {type : String, required : true},
}, {timestamps : true});

export default mongoose.model('Comments', CommentSchema);