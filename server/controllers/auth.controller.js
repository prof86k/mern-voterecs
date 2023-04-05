import { jwt } from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import userModel from "../models/user.model";
import config from "../../config/config";

export const signIn = async (req, res) => {
    //user must sign in to access app functionalities
    try {
        let user = await userModel.findOne({ 'email': req.body.email });
        if (!user) return res.status('401').json({ 'error': 'User not found!' });
        if (!user.authenticate(req.body.password)) {
            return res.status('401').json({
                'error': 'Email and Password don\'t match'
            });
        }
        // create and set token to the cookie
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie('t', token, { expire: new Date() + 9999 });

        return res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
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

export const requireSignIn = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
});

export const hasAuthorization = (req, res, next) => {
    // restrict the users who only has authorization permission
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!(authorized)) {
        return res.status(403).json({ error: 'User Not Authorized!' });
    }
    next();
}