import express from "express";
import userService from '../services/user.services';
import argon2 from "argon2";
import { log } from "node:console";
import { addUser } from "../users/users.config";

export async function listUsers(req: express.Request, res: express.Response) {
    const users = await userService.list(100, 0);
    res.status(200).send(users);
}

export async function getUserById(req: express.Request, res: express.Response) {
    const user = await userService.readById(req.body.id);
    res.status(200).send(user);
}

export async function createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.create(req.body);
    res.status(201).send({ id: userId });
}

export async function patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
        req.body.password = await argon2.hash(req.body.password);
    }
    log(await userService.patchById(req.body.id, req.body));
    res.status(204).send();
}

export async function put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await userService.putById(req.body.id, req.body));
    res.status(204).send();
}

export async function removeUser(req: express.Request, res: express.Response) {
    log(await userService.deleteById(req.body.id));
    res.status(204).send();
}

