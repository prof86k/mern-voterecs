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