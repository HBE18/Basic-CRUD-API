import express from "express";
import * as uConfig from "../business/users.config"

    async function validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await uConfig.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ errors: ['User email already exists'] });
        } else {
            next();
        }
    }

    async function validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user._id === req.params.userId) {
            next();
        } else {
            res.status(400).send({ errors: ['Invalid email'] });
        }
    }

    async function userCantChangePermission(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            'permissionFlags' in req.body &&
            req.body.permissionFlags !== res.locals.user.permissionFlags
        ) {
            res.status(400).send({
                errors: ['User cannot change permission flags'],
            });
        } else {
            next();
        }
    }

    var validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    async function validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await uConfig.getUserById(req.params.userId);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                errors: [`User ${req.params.userId} not found`],
            });
        }
    }

    async function extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.userId;
        next();
    }

module.exports;