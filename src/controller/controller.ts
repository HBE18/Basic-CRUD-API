import express from "express";
import * as business from "../business/main"
import { HttpCode } from "../constants";

export async function listUsers(req: express.Request, res: express.Response) {
    const users = await business.getUsers();
    if(users != undefined){
        res.status(HttpCode.Success).json(users.rows);
    }
    else{
        res.status(HttpCode.NoContent).send("List operation failed");
    }
}
export async function getUserById(req: express.Request, res: express.Response) {
    const user = await  business.getUserById(req.params.id);
    res.status(HttpCode.Success).json(user);
}
export function createUser(req: express.Request, res: express.Response) {
    //req.body.password;
    const userId = business.addUser(req.body);
    res.status(HttpCode.Created).json({ id: userId });
}
export async function patch(req: express.Request, res: express.Response) {
    const rep = await business.patchUserById(req.body.userid, req.body)
    console.log(rep);
    res.status(HttpCode.Success).json(`User ${rep} has updated by Patch`);
}
export async function put(req: express.Request, res: express.Response) {
    const rep = await business.putUserById(req.body.userid, req.body)
    console.log(rep);
    res.status(HttpCode.Success).json(`User ${rep} has updated by PUT`);
}
export async function removeUser(req: express.Request, res: express.Response) {
    await business.removeUserById(req.params.userId);
    res.status(HttpCode.Success).send();
}

module.exports;
