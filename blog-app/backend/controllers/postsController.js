import  Post from '../models/Posts.js';
import Comment from '../models/Comments.js';

export const CreatePost = async (req,res) => {
    const {title, body, tags} = req.body;
    try{
        const post = new Post({title, body, tags, author : req.user.id});
        await post.save();
        res.status(201).json(post);
    }catch(err){
        res.status(500).json('Server Error');
    }
};

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.findOne().populate('author', 'name email').sort({createdAt : -1});
        res.json(posts);
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
};

export const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.param.id).populate('author','name email');
        if(!post) return res.status(404).json({message : 'Post not found'});
        const comment = await Comment.find({post:post._id}).populate('author','name');
        res.json(post, comment);
    }catch(err){
        res.staus(500).json({message : 'Server Error'});
    }
};

export const updatePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message : "Post not found"});
        if(post.author.toString() !== req.user.id) return res.status(403).json({message : 'Forbidden'});
        post.title = req.params.title ?? post.title;
        post.body = req.params.body ?? post.body;
        post.tags = req.params.tags ?? post.tags;
        await post.save();
        res.json(post);
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
};

export const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message : "Post not found"});
                if(post.author.toString() !== req.user.id) return res.status(403).json({message : 'Forbidden'});
                await Comment.deleteMany({post:post._id});
                await post.remove();
                res.json({message : 'Post Deleted'});
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
}; 