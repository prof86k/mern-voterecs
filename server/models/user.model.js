import mongoose from "mongoose";
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        required: 'Email is required',
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'Fill in a valid email']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    role: {
        type: String,
        default: 'polling agent',
        enum: ['admin', 'regional coordinator', 'constituency coordinator', 'polling agent']
    },
    password: {
        type: String,
        required: 'Password Required'
    },
    salt: String,
});
export default mongoose.model('User', UserSchema);

// UserSchema.virtual('password')
// .set(function(password){
// this._password = password;
// this.salt = this.makeSalt();
// this.hashed_password = this.encryptPassword(password);
// })
// .get(function(){
// return this._password;
// });
//
// UserSchema.methods = {
// authenticate(plaintext){
// return this.encryptPassword(plaintext) === this.hashed_password;
// },
// encryptPassword(password){
// if(!password) return ''
// try{
// return crypto
// .createHmac('sha1', this.salt)
// .update(password)
// .digest('hex')
// }catch(error){
// return error
// }
// },
// makeSalt(){
// return Math.round((new Date().valueOf() * Math.random()));
// }
// };
//
// UserSchema.path('hashed_password').validate(function(v){
// if(this._password && this._password.length < 6){
// this.invalidate('password','Password must be at least 6 characters')
// }
// if(this.isNew && !this._password){
// this.invalidate('password','Password is required');
// }
// },null);