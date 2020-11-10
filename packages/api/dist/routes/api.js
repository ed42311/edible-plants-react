"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
exports.apiRouter = express_1.Router();
exports.apiRouter.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message.",
        user: req.user,
    });
});
//# sourceMappingURL=api.js.map