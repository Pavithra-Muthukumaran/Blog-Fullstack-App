import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({message : "Not authorized. No Token"});
    }
    const token = header.split(' ')[1];
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user={id : decode.id, email : decode.email};
        next();
    }catch(err){
        res.status(401).json({message : "Invalid Token"});
    }
};