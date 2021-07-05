import express from 'express';
import { foo } from './users/users.config';
const config = require("../config.json");
const app = express();
const port = config.serverConfig.port;
app.use(express.json());

//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/",(req , res) => {
    res.status(200).send(msg);
})
console.log(msg);
foo
app.listen(port);