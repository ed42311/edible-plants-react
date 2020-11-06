"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const utils_1 = require("./utils");
const middleware_1 = require("./middleware");
// Config
dotenv.config();
const { PORT } = process.env;
// Check port and set
utils_1.exitOne(PORT);
const port = utils_1.stringToNumber(PORT);
const app = express_1.default();
// Middlewares
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// Local Middlewares
app.use(middleware_1.loggerMiddleware);
// Routes
app.get('/test', (req, res) => {
    res.send('Hello world!');
});
app.post('/', (req, res) => {
    res.send(req.body);
});
const server = app.listen(port, () => {
    console.log(`Listenin on port ${port}`);
});
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
//# sourceMappingURL=index.js.map