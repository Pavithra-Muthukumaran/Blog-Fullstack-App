import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, rquired : true, unique : true, lowercase : true},
    password : {type : String, required : true}
}, {timestamps : true});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password',)) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(plain) {
    return await bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', UserSchema);
