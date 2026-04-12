"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePet = exports.insertPet = exports.deletePet = exports.getById = exports.getAll = exports.login = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const login = async (req, res) => {
    const { email, password } = req.body;
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        const [results] = await connection.query(`
                SELECT login(?,?) as id
            `, [email, password]);
        if (!results[0].id) {
            return res.status(401).json({ error: "Hibás email vagy jelszó" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: results[0].id }, config_1.default.JwtSecret, { expiresIn: "2h" });
        return res.status(200).json({ token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.login = login;
const getAll = async (_req, res) => {
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        const [results] = await connection.query(`
            SELECT * from pet;
            `);
        if (results.length === 0) {
            return res.status(404).json("Üres adatbázis");
        }
        return res.status(200).json(results);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.getAll = getAll;
const getById = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(404).json("Nincs ilyen id");
    }
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        const [results] = await connection.query(`
            SELECT * from pet WHERE id = ?
            `, [id]);
        if (results.length === 0) {
            return res.status(404).json("Nincs ilyen pet");
        }
        return res.status(200).json(results);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.getById = getById;
const deletePet = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(404).json("Nincs ilyen id");
    }
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        const [results] = await connection.query(`
            DELETE from pet WHERE id = ?
            `, [id]);
        if (results.affectedRows === 0) {
            return res.status(400).json("Nincs ilyen pet");
        }
        return res.status(200).json("Törölve");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.deletePet = deletePet;
const insertPet = async (req, res) => {
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        if (!req.body.nev || !req.body.leiras || isNaN(Number(req.body.ar)) || isNaN(Number(req.body.raktaron))) {
            return res.status(400).json("Hiányos vagy rossz formátum");
        }
        const [_results] = await connection.query(`
            INSERT INTO pet VALUES(NULL,?,?,?,?,?)
            `, [req.body.nev, req.body.leiras, Number(req.body.ar), Number(req.body.raktaron), req.body.kep]);
        return res.status(201).json("Hozzáadva");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.insertPet = insertPet;
const updatePet = async (req, res) => {
    const id = Number(req.params.id);
    const { nev, leiras, ar, raktaron, kep } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: "Hibás ID" });
    }
    if (!nev || !leiras || ar === undefined || raktaron === undefined) {
        return res.status(400).json({ error: "Minden mező kötelező (PUT)" });
    }
    const connection = await promise_1.default.createConnection(config_1.default.database);
    try {
        const [results] = await connection.query(`
            UPDATE pet SET nev = ?, leiras = ?, ar = ?, raktaron = ?, kep = ? WHERE id = ?
            `, [nev, leiras, Number(ar), Number(raktaron), kep, id]);
        if (results.affectedRows === 0)
            return res.status(404).json("Hiba");
        return res.status(200).json({ message: "Update kész" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });
    }
};
exports.updatePet = updatePet;
