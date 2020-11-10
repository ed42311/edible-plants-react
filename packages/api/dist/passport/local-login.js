"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localLoginStrategy = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = require("../models");
const passport_local_1 = require("passport-local");
const config_1 = __importDefault(require("../config"));
/**
 * Return the Passport Local Strategy object.
 */
exports.localLoginStrategy = new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
    };
    // find a user by email address
    return models_1.User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
        // check if a hashed user's password is equal to a value saved in the database
        const isMatch = models_1.User.validatePassword(userData.password);
        if (!isMatch) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
        const payload = {
            sub: user._id,
        };
        // create a token string
        const token = jsonwebtoken_1.sign(payload, config_1.default.jwtSecret);
        const data = {
            message: 'yah',
            email: user.email,
        };
        return done(null, token, data);
    });
});
//# sourceMappingURL=local-login.js.map