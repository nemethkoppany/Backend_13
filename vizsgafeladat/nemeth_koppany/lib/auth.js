"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const verifyToken = (req, res, next) => {
    const token = req.body?.token || req.query?.token || req.headers?.['x-access-token'];
    if (!token) {
        return res.status(403).json({ error: "Token szükséges a hozzáféréshez!" });
    }
    try {
        if (!config_1.default.jwtSecret) {
            return res.status(401).json({ error: "Hiba a titkos kulcsnál" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.user = decodedToken;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: "Hibás token" });
    }
};
exports.default = verifyToken;
