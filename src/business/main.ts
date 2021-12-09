import express, { query, response } from "express";
import * as models from "../models/models";
import shortid from "shortid";
import { Pool, QueryResult } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "postgres",
    host: "localhost",
    port: 5432,
    connectionTimeoutMillis: 10000
});
const app = express();

export function addUser(user: models.UserInsert): string {
    const userid = shortid.generate();
    try {
        pool.connect((error, client, release) => {
            client.query<{
                email: string;
                password?: string;
                firstName?: string;
                lastName?: string;
                securityLevel: number;
            }>(`INSERT INTO USERS(userid,email,pass,firstName,lastName,securityLevel) 
            VALUES ($1, $2, $3, $4, $5, $6)`,
             [userid, user.email, user.password, user.firstName, user.lastName, user.securityLevel]);
            release();
        })
    } catch (error) {
        console.error(error);
    }
    return userid;
}

export async function getUsers(): Promise<QueryResult<any>> {
    try {
        return await pool.query(`SELECT * FROM USERS`);
    } catch (error) {
        console.error(error);
        throw(error);
    }
}


export async function getUserById(userId: string): Promise<models.UserUpdate> {
    try {
        const { rows, rowCount } = await pool.query<{
            email: string;
            password?: string;
            firstname?: string;
            lastName?: string;
            securityLevel: number;
        }>(`
            SELECT userid, email, pass as password, firstname, lastName, securityLevel
            FROM USERS WHERE userid = $1`, [userId]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export async function putUserById(userId: string, user: models.Patch): Promise<string> {
    const resp = await pool.connect((error, client, release) => {
        client.query<{
            email?: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            securityLevel?: number;
        }>(`UPDATE USERS SET 
        userid = '${1}',email = $2,pass = $3,firstName = $4,lastName = $5,securityLevel = $6 
        WHERE userid = ${1}`,
            [userId, user.email, user.password, user.firstName, user.lastName, user.securityLevel]);
        release();
    });
    return userId;
}

export async function patchUserById(userId: string, user: models.Patch): Promise<string> {
    const alpha = await getUserById(userId);
        const updatedUser = {
            email: user.email ?? alpha.email,
            password : user.password ?? alpha.password,
            firstName : user.firstName ?? alpha.firstName,
            lastName : user.lastName ?? alpha.lastName,
            securityLevel : user.securityLevel ?? alpha.securityLevel
        } as models.UserUpdate;
    await putUserById(userId,updatedUser)
    return userId;
}

export async function removeUserById(userId: string): Promise<void> {
    return await new Promise((resolve, reject) => {
        pool.connect(async (error, client, release) => {
            await client.query<{
                userid: string;
            }>(`DELETE FROM USERS WHERE userid = $1`, [userId]);
            release();
            resolve();
        })
    })
}

export async function getUserByEmail(email: string): Promise<boolean> {
    try {
        const {rows, rowCount} = await pool.query<{
                userid : string;
            }>(`SELECT userid FROM USERS WHERE email = $1`, [email]);
        if(rowCount === 0){
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

module.exports;
