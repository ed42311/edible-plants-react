"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validator_1 = __importDefault(require("validator"));
const passport_1 = require("passport");
exports.authRouter = express_1.Router();
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 *
 */
function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload ||
        typeof payload.email !== 'string' ||
        !validator_1.default.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }
    if (!payload ||
        typeof payload.password !== 'string' ||
        payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if (!payload ||
        typeof payload.firstName !== 'string' ||
        payload.firstName.trim().length === 0) {
        isFormValid = false;
        errors.firstName = 'Please provide your given name.';
    }
    if (!payload ||
        typeof payload.lastName !== 'string' ||
        payload.lastName.trim().length === 0) {
        isFormValid = false;
        errors.lastName = 'Please provide your family name.';
    }
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }
    return {
        success: isFormValid,
        message,
        errors,
    };
}
/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 *
 */
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload ||
        typeof payload.email !== 'string' ||
        payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }
    if (!payload ||
        typeof payload.password !== 'string' ||
        payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }
    return {
        success: isFormValid,
        message,
        errors,
    };
}
exports.authRouter.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
        });
    }
    return passport_1.authenticate('local-signup', (err) => {
        if (err) {
            console.log('error', err);
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.',
                    },
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.',
        });
    })(req, res, next);
});
exports.authRouter.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
        });
    }
    return passport_1.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.',
            });
        }
        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData,
        });
    })(req, res, next);
});
//# sourceMappingURL=auth.js.map