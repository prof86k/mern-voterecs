import {extend} from "lodash";
import userModel from "../models/user.model";

export const createUser = async (req, res) => {
    // create new user 
    const user = new userModel(req.body);
    try {
        await user.save();
        return res.status(200).json({
            'message':'Successfully Signed Up!'
        });
    } catch (error) {
        return res.status(400).json({'message':'Error'});
    }

}

export const listUsers = async (req, res) => {
    // list all users
    try {
        const users = await userModel.find().select('name email updated createdAt hashed_password');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const updateUser = async (req, res) => {
    // update user of a particular ID
    try {
        const user = req.profile;
        user = extend(user,req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.status(201).json(user);
    } catch(error){
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
    try{
        let user = await userModel.findById(id);
        if (!user) return res.status(400).json({'message':'User not found!'})
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json(error);
    }
}