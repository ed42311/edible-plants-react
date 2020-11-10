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
exports.Plant = void 0;
const mongoose_1 = require("mongoose");
const plantSchema = new mongoose_1.Schema({
    commonName: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
        required: false,
    },
    edible: {
        type: String,
        required: true,
    },
    picUrl: {
        type: String,
        required: false,
    },
}, { timestamps: true });
plantSchema.static('create', (attr) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlant = new exports.Plant(attr);
    const savedPlant = yield newPlant.save();
    return savedPlant;
}));
plantSchema.static('findAll', () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.Plant.find({});
}));
exports.Plant = mongoose_1.model('Plant', plantSchema);
//# sourceMappingURL=plant.js.map