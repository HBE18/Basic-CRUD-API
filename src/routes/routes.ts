import  "../controller/controller"
import express from "express";
import * as control from "../controller/controller";
const userRouter = express.Router();

userRouter
.route("/users")
.get(control.listUsers)
.post(control.createUser)

userRouter
.route("/users/:userId")
/* .all((req:express.Request,res:express.Response ,next: express.NextFunction) =>{
    next();
}) */
.get(control.getUserById)
.patch(control.patch)
.delete(control.removeUser)
.put(control.put);

export default userRouter;
module.exports = userRouter;