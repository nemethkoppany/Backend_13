"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const verifyToken = (req, res, next) => {
    const token = req.body.token;
    try {
        if (!token) {
            return res.status(404).json("Nincs token");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.JwtSecret);
        req.user = decodedToken;
        return next();
    }
    catch (err) {
        console.log(err);
    }
};
exports.verifyToken = verifyToken;
