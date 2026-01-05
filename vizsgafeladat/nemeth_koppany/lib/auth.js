"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("./config");
var verifyToken = function (req, res, next) {
    var _a, _b, _c;
    var token = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.query) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req.headers) === null || _c === void 0 ? void 0 : _c['x-access-token']);
    if (!token) {
        return res.status(403).json({ error: "Token szükséges a hozzáféréshez!" });
    }
    try {
        if (!config_1.default.jwtSecret) {
            return res.status(401).json({ error: "Hiba a titkos kulcsnál" });
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.user = decodedToken;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: "Hibás token" });
    }
};
exports.default = verifyToken;
