import express, { response }  from "express";
import * as models from "../models/models";
import shortid from "shortid";
import { Client, Pool } from "pg";

const pool = new Pool({
    user : "postgres",
    password : "12345678",
    database : "postgres",
    host : "localhost",
    port : 5432,
    connectionTimeoutMillis: 10000
});
const app = express();

export function addUser(user: models.UserInsert): string{
    const userid = shortid.generate();
    try {
        pool.connect((error,client,release) => {
        client.query<{
            email: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            securityLevel: number;
        }>(`INSERT INTO USERS(userid,email,pass,firstName,lastName,securityLevel) 
        VALUES ('${1}', '${2}', '${3}', '${4}', '${5}', ${6})`,[userid,user.email,user.password,user.firstName,user.lastName,user.securityLevel]);
        release();
    })
    } catch (error) {
        console.error(error);
    }
    return userid;
}

export async function getUsers() {
    try {
        const users =
        await pool.query('SELECT userid,email,pass,firstName,lastName,securityLevel FROM USERS');
        return users;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserById(userId: string) {
    try {
        const user = await pool.query(`SELECT userid,email,pass,firstName,lastName,securityLeve FROM USERS WHERE userid = ${1}`,[userId]);
    return user.rows;
    } catch (error) {
        console.error(error)
    }
}

export async function putUserById(userId: string, user: models.UserUpdate):Promise<string> {
    const resp = await pool.connect((error,client,release) => {
        client.query<{
            email: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            securityLevel: number;
        }>(`UPDATE USERS SET userid = '${1}',email = '${2}',pass = '${3}',firstName = '${4}',lastName = '${5}',securityLevel = '${6}'WHERE userid = ${7}`,
        [userId,user.email,user.password,user.firstName,user.lastName,user.securityLevel,userId]);
        release();
    });
    return userId;
}

export async function patchUserById(userId: string, user: models.Patch) : Promise<string> {
    const resp = await pool.connect((error,client,release) => {
        client.query<{
            email: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            securityLevel: number;
        }>(``);
        release();
    })
    return userId;
}

export async function removeUserById(userId: string) {

    const resp = await pool.connect((error,client,release) => {
        client.query<{
            userid : string;
        }>(`DELETE FROM USERS WHERE userid = '${1}'`,[userId]);
    })
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