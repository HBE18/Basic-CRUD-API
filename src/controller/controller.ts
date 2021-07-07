import express from "express";
import argon2 from "argon2";
import { log } from "node:console";
import * as business from "../business/users.config"

/*
  export async function getUser(req: express.Request, res: express.Response) {
      //validate
      //business function ?
      //dal function
    const user = await readById(req.body.id);
    res.status(200).send(user);
}
 */

export async function listUsers(req: express.Request, res: express.Response) {
    const users = await business.getUsers;
    res.status(200).send(users);
}
export async function getUserById(req: express.Request, res: express.Response) {
    const user = await business.getUserById(req.body.id);
    res.status(200).send(user);
}
export async function createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await business.addUser(req.body);
    res.status(201).send({ id: userId });
}
export async function patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
        req.body.password = await argon2.hash(req.body.password);
    }
    log(await business.patchUserById(req.body.id, req.body));
    res.status(204).send();
}
export async function put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await business.putUserById(req.body.id, req.body));
    res.status(204).send();
}
export async function removeUser(req: express.Request, res: express.Response) {
    log(await business.removeUserById(req.body.id));
    res.status(204).send();
}
