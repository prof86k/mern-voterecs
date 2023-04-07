import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from '../config/config';

const isAuthenticated = async (req, res, next) => {
    try {
        // check if the auh header exists
        if (req.headers.authorization) {
            // parse token from the header
            const token = req.headers.authorization.split(" ")[1]; // split the headers and get the token
            if (token) {
                const payload = jwt.verify(token, config.jwtSecret);
                if (payload) {
                    // store user data in the request
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: 'token verification failed!...' });
                }
            } else {
                res.status(400).json({ error: 'malformed auth header' });
            }
        } else {
            res.status(400).json({ error: 'No authorization header' })
        }
    } catch (error) {

    }
}

const requireSignIn = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
});

const hasAuthorization = (req, res, next) => {
    // restrict the users who only has authorization permission
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!(authorized)) {
        return res.status(403).json({ error: 'User Not Authorized!' });
    }
    next();
}

export default { isAuthenticated, requireSignIn, hasAuthorization };