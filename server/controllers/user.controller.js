import { extend } from "lodash";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    // create new user 
    const { email, password } = req.body;
    if (userModel.findOne({ email })) return res.status(401).json({ 'message': 'User Already Exists!.' })
    if (password) {
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                const user = new userModel(req.body);
                user.password = hashedPassword;
                // save and return user
                user.save()
                    .then(results => res.status(201).json({ 'message': 'Sign up successful ' }))
                    .catch(error => res.status(500).json({ error: 'unable to save user' + error }))
            });
    } else {
        return res.status(402).json({ error: 'No Password Entered!.' })
    }

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