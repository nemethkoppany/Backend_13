"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () { return console.log("A szerver fut a ".concat(PORT)); });
