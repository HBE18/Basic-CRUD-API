import express from 'express';
const config = require("../config.json");


const app = express();
const port = config.port;
app.use(express.json());

//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/",(req , res) => {
    res.status(200).send(msg);
})
console.log(msg);

app.listen(port);