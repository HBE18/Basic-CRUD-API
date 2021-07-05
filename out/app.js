"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_config_1 = require("./users/users.config");
const config = require("../config.json");
const app = express_1.default();
const port = config.serverConfig.port;
app.use(express_1.default.json());
//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/", (req, res) => {
    res.status(200).send(msg);
});
console.log(msg);
users_config_1.foo;
app.listen(port);
//# sourceMappingURL=app.js.map