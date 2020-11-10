"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = express_1.Router();
// Models
const models_1 = require("../models");
exports.userRouter
    .route('/users')
    .get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield models_1.User.find({}));
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validators
        const newUser = new models_1.User(req.body);
        const savedUser = yield newUser.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.userRouter
    .route('/user/:user_id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validators
        const foundUser = yield models_1.User.findById(req.params.user_id);
        res.json(foundUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield models_1.User.findById(req.params.user_id);
        foundUser.email = req.body.email;
        foundUser.password = req.body.password;
        const savedUser = yield foundUser.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield models_1.User.findOneAndDelete({
            _id: req.params.user_id,
        });
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
//# sourceMappingURL=user.js.map