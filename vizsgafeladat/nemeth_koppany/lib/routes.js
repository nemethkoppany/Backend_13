"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.post("/api/login", controller_1.login);
router.get("/api/auto", controller_1.getAllAutok);
router.get("/api/auto/:id", controller_1.getAutoById);
router.post("/api/auto", controller_1.createAuto);
router.put("/api/auto/:id", controller_1.updateAuto);
router.delete("/api/auto/:id", controller_1.deleteAuto);
router.post("/api/kolcsonzes/:autoid", auth_1.default, controller_1.postKolcsonzes);
router.get("/api/kolcsonzes/auto/:id", auth_1.default, controller_1.getKolcsonzes);
exports.default = router;
