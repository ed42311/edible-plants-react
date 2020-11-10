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
exports.plantRouter = void 0;
const express_1 = require("express");
// Models
const models_1 = require("../models");
exports.plantRouter = express_1.Router();
const { create } = models_1.Plant;
exports.plantRouter
    .route('/plants')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield models_1.Plant.findAll());
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validators
        res.json(yield create(req.body));
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.plantRouter
    .route('/plant/:plant_id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPlant = yield models_1.Plant.findById(req.params.plant_id);
        res.json(foundPlant);
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPlant = yield models_1.Plant.findById(req.params.plant_id);
        foundPlant.commonName = req.body.commonName;
        foundPlant.edible = req.body.edible;
        const savedPlant = yield foundPlant.save();
        res.json(savedPlant);
    }
    catch (err) {
        res.status(500).send(err);
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlant = yield models_1.Plant.findOneAndDelete({
            _id: req.params.plant_id,
        });
        res.json(deletedPlant);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
//# sourceMappingURL=plant.js.map