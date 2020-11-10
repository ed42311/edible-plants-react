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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.methods.validatePassword = function (pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(pass, this.password);
    });
};
/**
 * The pre-save hook method.
 */
userSchema.pre('save', function (next) {
    // proceed further only if the password is modified or the user is new
    if (!this.isModified('password'))
        return next();
    return bcryptjs_1.default.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }
        return bcryptjs_1.default.hash(this.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }
            // replace a password string with hash value
            this.password = hash;
            return next();
        });
    });
});
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.js.map