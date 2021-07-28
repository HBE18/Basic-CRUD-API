import express from 'express';
import { HttpCode } from './constants';
import userRouter from './routes/routes';
import { Pool } from "pg";

const config = require("../config.json");
const app = express();
const port = config.serverConfig.port;
app.use(express.json());
app.use(userRouter);
const poolConfig = config.dbConfig;
const pool = new Pool(poolConfig);

//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;

app.get("/", async (req, res) => {
    res.status(HttpCode.Success).send(msg);
})


console.log(msg);
app.listen(port);