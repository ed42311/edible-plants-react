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
const passport_1 = require("passport");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
// Local
const utils_1 = require("./utils");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const passport_2 = require("./passport");
// Configuration Options
dotenv.config();
const { PORT } = process.env;
const port = utils_1.stringToNumber(PORT);
const databaseName = 'plants';
const dbUri = `mongodb://localhost:27017/${databaseName}`;
const mongodbOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Check port and set
utils_1.exitOne(PORT);
const app = express_1.default();
// Middlewares
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(passport_1.initialize());
app.use(body_parser_1.urlencoded({ extended: true }));
// Local Middlewares
app.use(middleware_1.loggerMiddleware);
passport_1.use('local-signup', passport_2.localSignupStrategy);
passport_1.use('local-login', passport_2.localLoginStrategy);
// Routes
// Public
app.use(routes_1.baseRouter);
// Auth
app.use('/auth', routes_1.authRouter);
// Private
app.use('/api', middleware_1.auth);
app.use('/api', routes_1.apiRouter);
app.use('/api', routes_1.userRouter);
app.use('/api', routes_1.plantRouter);
// Attach to mongo
mongoose_1.default.connect(dbUri, mongodbOpts, () => {
    console.log('Connected to database');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map