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

export function getUsers() {
    return users;
}

export function getUserById(userId: string) {
    return users.find((user: { id: string }) => user.id === userId);
}

export function putUserById(userId: string, user: UserInsert) {
    const objIndex = users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
}

export function patchUserById(userId: string, user: Patch) {
    const objIndex = users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    let currentUser = users[objIndex];
    const allowedPatchFields = [
        'password',
        'firstName',
        'lastName',
        'permissionLevel',
    ];
    for (let field of allowedPatchFields) {
        if (field in user) {
            // @ts-ignore
            currentUser[field] = user[field];
        }
    }
    users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
}

export function removeUserById(userId: string) {
    const objIndex = users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    users.splice(objIndex, 1);
    return `${userId} removed`;
}

export function getUserByEmail(email: string) {
    const objIndex = users.findIndex(
        (obj: { email: string }) => obj.email === email
    );
    let currentUser = users[objIndex];
    if (currentUser) {
        return currentUser;
    } else {
        return null;
    }
}
module.exports;