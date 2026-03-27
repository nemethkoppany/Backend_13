"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
router.post("/login", controller_1.login);
router.post("/insertpet", controller_1.insertPet);
router.put("/update", controller_1.updatePet);
exports.default = router;
