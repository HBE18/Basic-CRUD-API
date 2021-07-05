"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config = require("../config.json");
const app = express_1.default();
const port = config.port;
app.use(express_1.default.json());
//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/", (req, res) => {
    res.status(200).send(msg);
});
console.log(msg);
app.listen(port);
