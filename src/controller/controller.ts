import express from "express";
import * as business from "../business/users.config"
import { HttpCode } from "../constants";

export function listUsers(req: express.Request, res: express.Response) {
    const users = business.getUsers();
    res.status(HttpCode.Success).send(users);
}
export function getUserById(req: express.Request, res: express.Response) {
    const user =  business.getUserById(req.body.id);
    res.status(HttpCode.Success).send(user);
}
export function createUser(req: express.Request, res: express.Response) {
    req.body.password;
    const userId = business.addUser(req.body);
    res.status(HttpCode.Created).send({ id: userId });
}
export function patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
        res.status(HttpCode.Success).send("Patch w/out argon");
    }
    console.log(business.patchUserById(req.body.id, req.body));
    res.status(HttpCode.NoContent).send();
}
export async function put(req: express.Request, res: express.Response) {
    console.log(await business.putUserById(req.params.id, req.params as any));
    res.status(HttpCode.NoContent).send();
}
export async function removeUser(req: express.Request, res: express.Response) {
    console.log(await business.removeUserById(req.body.id));
    res.status(HttpCode.NoContent).send();
}

module.exports;
