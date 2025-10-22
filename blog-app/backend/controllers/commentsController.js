import Comment from '../models/Comments.js';

export const addComment = async (req, res) => {
    try{
        const {content} = req.body;
        const comment = new Comment({content, author : req.user.id, post : req.params.postId});
        await comment.save();
        res.status(201).json(await comment.populate('author', 'name')); 
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
};

export const deleteComment = async (req, res) =>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({message : 'Not Found'});
        if(comment.author.toString() !== req.user.id) return res.status(403).json({message : 'Forbidden'});
        await comment.remove();
        res.json({message : 'Deleted'});
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
};