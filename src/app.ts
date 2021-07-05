import express from 'express';

const app = express();
var port = 3000; //added port as var since I will ask user to enter port num $default = 3000
app.use(express.json());

//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/",(req , res) => {
    res.status(200).send(msg);
})
console.log(msg);

app.listen(port);