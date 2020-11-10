"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
exports.loggerMiddleware = (request, _response, next) => {
    console.log(`${request.method} ${request.path}`);
    next();
};
//# sourceMappingURL=logger.js.map