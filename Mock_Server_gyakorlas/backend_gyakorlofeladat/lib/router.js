"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_1 = require("./controller");
var router = (0, express_1.default)();
router.get("/", controller_1.run);
router.get("/macsekok", controller_1.getAllData);
router.get("/macsekok/:id", controller_1.getDataFromId);
router.post("/macsekok", controller_1.InsertData);
router.delete("/macsekok/:id", controller_1.DeleteData);
router.put("/macsekok/:id", controller_1.PutData);
router.patch("/macsekok/:id", controller_1.PatchData);
exports.default = router;
