import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/Users.js';

dotenv.config();

const signToken = (user) =>{
    return jwt.sign({id : user_.id, email : user.email}, process.env.JWT_SECRET, {expiresIn : process.env.TOKEN_EXPIRES_IN || '7d'});
}

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email });
        if(user) return res.status(400).json({message : "User already exists"});
        user = new User({name, email, password});
        await user.save();
        const token = signToken(user);
        res.json({token, user : {id : user._id, name : user.name, email : user.email}});
    }catch(err){
        res.status(500).json({message : 'Sever Error'});
    };
};

export const login = async (req, res) => {
    const{name, email, password} = req.body;
    try{
        let user = await User.findOne({email })
        if(!user) return res.status(400).json({message : "Invalid credentials"});
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message : "Invalid credentials"});
        const token = signToken(user);
        res.json({token, user : {id : user._id, name : user.name, email : user.email}});
    }catch(err){
        res.status(500).json({message : "Server Error"});
    }
};

export const me = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        res.status(500).json({message : 'Server Error'});
    }
};