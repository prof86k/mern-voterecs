import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import userModel from "../models/user.model";
import config from "../../config/config";

export const signIn = async (req, res) => {
    //user must sign in to access app functionalities
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status('401').json({ 'error': 'User not found!' });
        const results = bcrypt.compare(req.body.password, user.password)
        if (results) {

            // create and set token to the cookie
            const token = jwt.sign({ _id: user._id, email: user.email }, config.jwtSecret);
            res.cookie('t', token, { expire: new Date() + 9999 });
            return res.status(201).json({
                token,
                msg: "Login Successful...!",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            return res.status('401').json({
                'error': 'Password don\'t match'
            });
        }

    } catch (error) {
        return res.status(401).json({
            error: `Could\'t sign in! due to ${error}`
        });
    }
}

export const signOut = (req, res) => {
    // log the user out of the system
    res.clearCookie("t");
    return res.status(200).json({ message: 'Signed Out!' });
}