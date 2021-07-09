"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const routes_1 = __importDefault(require("./routes/routes"));
const config = require("../config.json");
const app = express_1.default();
const port = config.serverConfig.port;
app.use(express_1.default.json());
app.use(routes_1.default);
//Basic get check on localhost
const msg = `App is running at http://localhost:${port}`;
app.get("/", (req, res) => {
    res.status(constants_1.HttpCode.Success).send(msg);
});
console.log(msg);
app.listen(port);
//# sourceMappingURL=app.js.map