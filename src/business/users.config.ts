import express, { response }  from "express";
import * as models from "../models/models";
import shortid from "shortid";
import { Pool } from "pg";

const pool = new Pool({
    user : "postgres",
    password : "12345678",
    database : "postgres",
    host : "localhost",
    port : 5432,
    connectionTimeoutMillis: 10000
});
const app = express();
// const users: Array<UserInsert> = [];

export function addUser(user: models.UserInsert): string{
    user.id = shortid.generate();
    try {
        pool.connect((error,client,release) => {
            client.query<{
                id: string;
                name: string;
            }>(`INSERT INTO USERS `);
    })
    } catch (error) {
        console.error(error);
    }
    return user.id;
}

export async function getUsers() {
    const users = await pool.query('SELECT * FROM USERS');
    return users;
    // return users;
}

export async function getUserById(userId: string) {
    try {
        const user = await pool.query(`SELECT * FROM USERS WHERE userid = ${userId}`);
    return user.rows;
    } catch (error) {
        console.error(error)
    }

    // return users.find((user: { id: string }) => user.id === userId);
}

export function putUserById(userId: string, user: models.UserInsert) {

/*     const objIndex = users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    users.splice(objIndex, 1, user);
    return `${user.id} updated via put`; */
}

export function patchUserById(userId: string, user: models.Patch) {

/*     const objIndex = users.findIndex(
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
    return `${user.id} patched`; */
}

export function removeUserById(userId: string) {

/*     const objIndex = users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    users.splice(objIndex, 1);
    return `${userId} removed`; */
}

export function getUserByEmail(email: string) {
/*     const objIndex = users.findIndex(
        (obj: { email: string }) => obj.email === email
    );
    let currentUser = users[objIndex];
    if (currentUser) {
        return currentUser;
    } else {
        return null;
    } */
    return true; // TODO: rewrite check
}
module.exports;