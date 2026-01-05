"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var DBConfig = /** @class */ (function () {
    function DBConfig() {
        return {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        };
    }
    return DBConfig;
}());
var config = {
    jwtSecret: process.env.JWT_SECRET,
    database: new DBConfig(),
};
exports.default = config;
