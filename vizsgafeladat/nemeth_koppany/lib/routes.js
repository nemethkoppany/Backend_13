"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = (0, express_1.Router)();
router.post("/api/login", controller_1.login);
exports.default = router;
