"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localSignupStrategy = void 0;
const models_1 = require("../models");
const passport_local_1 = require("passport-local");
const mongoose_1 = require("mongoose");
exports.localSignupStrategy = new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}, (req, email, password, done) => {
    const userData = {
        _id: mongoose_1.Types.ObjectId(),
        email: email.trim(),
        password: password.trim(),
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
    };
    const newUser = new models_1.User(userData);
    newUser.save((err) => {
        if (err) {
            return done(err);
        }
        return done(null);
    });
});
//# sourceMappingURL=local-signup.js.map