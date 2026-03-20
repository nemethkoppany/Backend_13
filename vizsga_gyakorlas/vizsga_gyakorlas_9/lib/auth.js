"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("./config"));
var verifyToken = function (req, res, next) {
    var token = req.body.token;
    try {
        if (!token) {
            return res.status(404).json("Nincs token");
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.JwtSecret);
        req.user = decodedToken;
        return next();
    }
    catch (err) {
        console.log(err);
    }
};
exports.verifyToken = verifyToken;
