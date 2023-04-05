import { extend } from "lodash";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    // create new user 
    const { email, hashed_password } = new userModel(req.body);

    const emailExist = new Promise((resolve, reject) => {
        userModel.findOne({ email }, function (err, email) {
            if (err) reject(new Error(err));
            if (email) reject({ "error": 'Email already exist!' });
            resolve();
        })
    });

    const passwordLong = new Promise((resolve, reject) => {
        if (hashed_password.length < 6) reject({ 'Error': "password must be more than 5 characters" });
        resolve();
    });

    Promise.all([emailExist, passwordLong])
        .then(() => {
            if (hashed_password) {
                bcrypt.hash(hashed_password, 10)
                    .then(hashedPassword => {
                        const user = new userModel(req.body);
                        user.hashed_password = hashedPassword;
                        // save and return user
                        user.save()
                            .then(results => res.status(201).json({ 'message': 'Sign up successful' }))
                            .catch(error => res.status(500).json({ error: 'unable to save user' }))
                    });
            } else {
                return res.status(402).json({ error: 'No Password Entered!.' })
            }
        }).catch(err => {
            return res.status(500).send({
                err: "Unable to hash password"
            })
        })



}

export const listUsers = async (req, res) => {
    // list all users
    try {
        const users = await userModel.find().select('name email updated createdAt');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const updateUser = async (req, res) => {
    // update user of a particular ID
    try {
        const user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }

}

export const removeUser = async (req, res) => {
    // remove a user of a particular id
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const readUser = (req, res) => {
    // read data of the particular id
    try {
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        return res.status(200).json(req.profile);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const findById = async (req, res, next, id) => {
    // find a user by id
    try {
        let user = await userModel.findById(id);
        if (!user) return res.status(400).json({ 'message': 'User not found!' })
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json(error);
    }
}