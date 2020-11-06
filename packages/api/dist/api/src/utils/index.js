"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = exports.exitOne = void 0;
const exitOne = (checkPresence) => {
    const isPresent = Boolean(checkPresence);
    if (!isPresent) {
        process.exit(1);
    }
};
exports.exitOne = exitOne;
const stringToNumber = (str) => parseInt(str, 10);
exports.stringToNumber = stringToNumber;
//# sourceMappingURL=index.js.map