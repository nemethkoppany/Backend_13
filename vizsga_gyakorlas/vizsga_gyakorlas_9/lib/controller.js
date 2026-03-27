"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePet = exports.insertPet = exports.deletePet = exports.getById = exports.getAll = exports.login = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("./config"));
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, connection, _b, results, token, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("\n                SELECT login(?,?) as id\n            ", [email, password])];
            case 3:
                _b = __read.apply(void 0, [_c.sent(), 1]), results = _b[0];
                if (!results[0].id) {
                    return [2 /*return*/, res.status(401).json({ error: "Hibás email vagy jelszó" })];
                }
                token = jsonwebtoken_1.default.sign({ userId: results[0].id }, config_1.default.JwtSecret, { expiresIn: "2h" });
                return [2 /*return*/, res.status(200).json({ token: token })];
            case 4:
                err_1 = _c.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getAll = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, _a, results, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("\n            SELECT * from pet;\n            ")];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                if (results.length === 0) {
                    return [2 /*return*/, res.status(404).json("Üres adatbázis")];
                }
                return [2 /*return*/, res.status(200).json(results)];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection, _a, results, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = Number(req.params.id);
                if (isNaN(id)) {
                    return [2 /*return*/, res.status(404).json("Nincs ilyen id")];
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("\n            SELECT * from pet WHERE id = ?\n            ", [id])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                if (results.length === 0) {
                    return [2 /*return*/, res.status(404).json("Nincs ilyen pet")];
                }
                return [2 /*return*/, res.status(200).json(results)];
            case 4:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getById = getById;
var deletePet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection, _a, results, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = Number(req.params.id);
                if (isNaN(id)) {
                    return [2 /*return*/, res.status(404).json("Nincs ilyen id")];
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("\n            DELETE from pet WHERE id = ?\n            ", [id])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                if (results.affectedRows === 0) {
                    return [2 /*return*/, res.status(400).json("Nincs ilyen pet")];
                }
                return [2 /*return*/, res.status(200).json("Törölve")];
            case 4:
                err_4 = _b.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deletePet = deletePet;
var insertPet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, _a, _results, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                if (!req.body.nev || !req.body.leiras || isNaN(Number(req.body.ar)) || isNaN(Number(req.body.raktaron))) {
                    return [2 /*return*/, res.status(400).json("Hiányos vagy rossz formátum")];
                }
                return [4 /*yield*/, connection.query("\n            INSERT INTO pet VALUES(NULL,?,?,?,?,?)\n            ", [req.body.nev, req.body.leiras, Number(req.body.ar), Number(req.body.raktaron), req.body.kep])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), _results = _a[0];
                return [2 /*return*/, res.status(201).json("Hozzáadva")];
            case 4:
                err_5 = _b.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.insertPet = insertPet;
var updatePet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, nev, leiras, ar, raktaron, kep, connection, _b, results, err_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = Number(req.params.id);
                _a = req.body, nev = _a.nev, leiras = _a.leiras, ar = _a.ar, raktaron = _a.raktaron, kep = _a.kep;
                if (isNaN(id)) {
                    return [2 /*return*/, res.status(400).json({ error: "Hibás ID" })];
                }
                if (!nev || !leiras || ar === undefined || raktaron === undefined) {
                    return [2 /*return*/, res.status(400).json({ error: "Minden mező kötelező (PUT)" })];
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("\n            UPDATE pet SET nev = ?, leiras = ?, ar = ?, raktaron = ?, kep = ? WHERE id = ?\n            ", [nev, leiras, Number(ar), Number(raktaron), kep, id])];
            case 3:
                _b = __read.apply(void 0, [_c.sent(), 1]), results = _b[0];
                if (results.affectedRows === 0)
                    return [2 /*return*/, res.status(404).json("Hiba")];
                return [2 /*return*/, res.status(200).json({ message: "Update kész" })];
            case 4:
                err_6 = _c.sent();
                console.log(err_6);
                return [2 /*return*/, res.status(500).json({ error: "Szerver hiba" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatePet = updatePet;
