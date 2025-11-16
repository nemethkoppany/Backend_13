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
exports.PutData = exports.patchData = exports.deleteData = exports.posttData = exports.getDataById = exports.getAllData = exports.run = void 0;
var config_1 = __importDefault(require("./config"));
var cat_1 = __importDefault(require("./cat"));
var promise_1 = __importDefault(require("mysql2/promise"));
var run = function (req, res) {
    res.status(200).json("A szerver fut");
};
exports.run = run;
var getAllData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, _a, results, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("Select * from cat")];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                res.status(200).json(results);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                res.status(404).json("Nem találhatók az adatok");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAllData = getAllData;
var getDataById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection, _a, result, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(404).json("Az elem nem található");
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("Select * from cat where id = ?", [id])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), result = _a[0];
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                res.status(404).json("Az elem nem található");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getDataById = getDataById;
var posttData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cat, connection, _a, results, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cat = new cat_1.default(req.body);
                if (!cat) {
                    res.status(200).json("Nem adtál meg adatokat a törzsben");
                    return [2 /*return*/];
                }
                if (cat.name === " " || cat.breed === " ") {
                    res.status(200).json("Nem adtál meg elég adatot");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("Insert into cat value(null,?,?,?,?,?)", [cat.name, cat.breed, cat.gender ? 1 : 0, parseInt(cat.age), cat.pictururl])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                res.status(200).json(results.insertId);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                console.log(err_3);
                res.status(404).json("Nem találhatók az adatok");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.posttData = posttData;
var deleteData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, connection, _a, results, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(404).json("Az adatok nem találhatók");
                }
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query("Delete from cat where id = ?", [id])];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                if (results.affectedRows > 0) {
                    res.status(200).json("Sikeresen t\u00F6r\u00F6lt ".concat(results.affectedRows, " elemet"));
                    return [2 /*return*/];
                }
                return [3 /*break*/, 5];
            case 4:
                err_4 = _b.sent();
                console.log(err_4);
                res.status(404).json("Nem sikerült törölni");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteData = deleteData;
var patchData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cat, allowedFields, keys, updateString, values, sql, connection, _a, results, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id);
                cat = new cat_1.default(req.body);
                if (isNaN(id)) {
                    return [2 /*return*/, res.status(400).json("Hibás paraméter")];
                }
                if (!cat) {
                    res.status(400).send("Nem adtál meg adatokat a törzsben");
                    return [2 /*return*/];
                }
                allowedFields = ["name", "breed", "gender", "age", "picurl"];
                keys = Object.keys(cat).filter(function (key) { return allowedFields.includes(key); });
                if (keys.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: 103, message: "Nincs frissítendő mező" })];
                }
                updateString = keys.map(function (key) { return "".concat(key, " = ?"); }).join(", ");
                values = keys.map(function (key) { return cat[key]; });
                values.push(id);
                sql = "UPDATE cat SET ".concat(updateString, " WHERE id = ?");
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connection.query(sql, values)];
            case 3:
                _a = __read.apply(void 0, [_b.sent(), 1]), results = _a[0];
                if (results.affectedRows > 0) {
                    return [2 /*return*/, res.status(200).json("Sikeresen friss\u00EDtett ".concat(results.affectedRows, " rekordot"))];
                }
                else {
                    return [2 /*return*/, res.status(404).json("Az elem nem található")];
                }
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json("Hiba történt a frissítés során")];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.patchData = patchData;
var PutData = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cat, allowedFields, keys, updateString, values, sql, connection, _a, existing, _b, results, _c, updated, insertSql, insertValues, _d, newCat, err_6;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = parseInt(req.params.id);
                cat = new cat_1.default(req.body);
                if (isNaN(id)) {
                    resp.status(400).send("Hibás paramétert adtál meg!");
                    return [2 /*return*/];
                }
                if (!req.body || Object.keys(req.body).length === 0) {
                    resp.status(400).send("Nem adtál meg adatokat a törzsben");
                    return [2 /*return*/];
                }
                allowedFields = ["name", "breed", "gender", "age", "picurl"];
                keys = Object.keys(cat).filter(function (key) { return allowedFields.includes(key); });
                if (keys.length === 0) {
                    resp.status(400).send({ error: 103, message: "Nincs frissítendő mező!" });
                    return [2 /*return*/];
                }
                updateString = keys.map(function (key) { return "".concat(key, " = ?"); }).join(", ");
                values = keys.map(function (key) { return cat[key]; });
                values.push(id);
                sql = "UPDATE cat SET ".concat(updateString, " WHERE id = ?");
                return [4 /*yield*/, promise_1.default.createConnection(config_1.default.database)];
            case 1:
                connection = _e.sent();
                _e.label = 2;
            case 2:
                _e.trys.push([2, 12, 13, 15]);
                return [4 /*yield*/, connection.query("SELECT * FROM cat WHERE id = ?", [id])];
            case 3:
                _a = __read.apply(void 0, [_e.sent(), 1]), existing = _a[0];
                if (!(existing.length > 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, connection.query(sql, values)];
            case 4:
                _b = __read.apply(void 0, [_e.sent(), 1]), results = _b[0];
                if (!(results.affectedRows > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, connection.query("SELECT * FROM cat WHERE id = ?", [id])];
            case 5:
                _c = __read.apply(void 0, [_e.sent(), 1]), updated = _c[0];
                resp.status(200).json({
                    message: "Sikeresen friss\u00EDtve (".concat(results.affectedRows, " elem)"),
                    data: updated[0],
                });
                return [2 /*return*/];
            case 6:
                resp.status(400).json("Nem történt módosítás");
                return [2 /*return*/];
            case 7: return [3 /*break*/, 11];
            case 8:
                insertSql = "\n                INSERT INTO cat (id, name, breed, gender, age, picurl)\n                VALUES (?, ?, ?, ?, ?, ?)\n            ";
                insertValues = [
                    id,
                    cat.name,
                    cat.breed,
                    cat.gender ? 1 : 0,
                    parseInt(cat.age),
                    cat.picurl,
                ];
                return [4 /*yield*/, connection.query(insertSql, insertValues)];
            case 9:
                _e.sent();
                return [4 /*yield*/, connection.query("SELECT * FROM cat WHERE id = ?", [id])];
            case 10:
                _d = __read.apply(void 0, [_e.sent(), 1]), newCat = _d[0];
                resp.status(201).json({
                    message: "Új rekord létrehozva (PUT → INSERT)",
                    data: newCat[0],
                });
                return [2 /*return*/];
            case 11: return [3 /*break*/, 15];
            case 12:
                err_6 = _e.sent();
                console.log("Hiba PUT során:", err_6);
                resp.status(500).json({ error: "Adatbázis hiba történt a PUT művelet közben" });
                return [3 /*break*/, 15];
            case 13: return [4 /*yield*/, connection.end()];
            case 14:
                _e.sent();
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.PutData = PutData;
