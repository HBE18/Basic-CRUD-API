import express  from "express";
import { UserInsert, Patch, UserUpdate } from "../models/models";
import shortid from "shortid";

const app = express();
const users: Array<UserInsert> = [];

export function addUser(user: UserInsert): string {
    user.id = shortid.generate();
    users.push(user);
    return user.id;
}

export function getUserByEmail(email: string) {
    users.find((item)=> email === email)
    return users.find({ email });
}

export  function getUserById(userId: string) {
    return users.findOne({ _id: userId }).populate('User').exec();
}

export  function getUsers(limit = 25, page = 0) {
    return users.find()
        .limit(limit)
        .skip(limit * page)
        .exec();
}
export async function updateUserById(
    userId: string,
    userFields: Patch | UserUpdate
)  {
    const existingUser = await users.find(

    function removeUserById(userId: string) {
        return users.deleteOne({ _id: userId }).exec();
    }

    return existingUser;
}