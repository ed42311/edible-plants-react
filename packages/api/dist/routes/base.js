"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
const express_1 = require("express");
exports.baseRouter = express_1.Router();
exports.baseRouter.get('/hello-world', (req, res) => {
    res.send('Hello world!');
});
exports.baseRouter.post('/check-body', (req, res) => {
    res.send(req.body);
});
//# sourceMappingURL=base.js.map