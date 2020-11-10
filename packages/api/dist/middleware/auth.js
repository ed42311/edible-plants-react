"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = require("../models");
const config_1 = __importDefault(require("../config"));
exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];
    // decode the token using a secret key-phrase
    return jsonwebtoken_1.verify(token, config_1.default.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            return res.status(401).end();
        }
        const userId = decoded.sub;
        // check if a user exists
        return models_1.User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            // pass user details onto next route
            req.user = user;
            return next();
        });
    });
};
//# sourceMappingURL=auth.js.map