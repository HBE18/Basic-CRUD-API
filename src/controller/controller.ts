import express from "express";
import * as business from "../business/users.config"
import { HttpCode } from "../constants";

export function listUsers(req: express.Request, res: express.Response) {
    const users = business.getUsers();
    res.status(HttpCode.Success).json(users);
}
export function getUserById(req: express.Request, res: express.Response) {
    const user =  business.getUserById(req.body.id);
    res.status(HttpCode.Success).json(user);
}
export function createUser(req: express.Request, res: express.Response) {
    // req.body.password;
    const userId = business.addUser(req.body);
    res.status(HttpCode.Created).json({ id: userId });
}
export function patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
        res.status(HttpCode.Success).send("Patch");
    }
    const resp = (business.patchUserById(req.body.id, req.body));
    res.status(HttpCode.NoContent).json();
}
export async function put(req: express.Request, res: express.Response) {
    const rep = await business.putUserById(req.body.id, req.body)
    console.log(rep);
    res.status(HttpCode.Success).json(`User ${rep} has updated by PUT`);
}
export async function removeUser(req: express.Request, res: express.Response) {
    console.log(await business.removeUserById(req.body.id));
    res.status(HttpCode.NoContent).send();
}

module.exports;
