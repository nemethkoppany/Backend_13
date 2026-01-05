import { Request, Response } from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import config from "./config";
import verifyToken from "./auth";

export const login = async (req: Request, res: Response) => {
    const { email, jelszo } = req.body;  
    console.log("Body:", req.body);


    if (!email || !jelszo) {
        return res.status(400).json({ error: "Hiányzó email vagy jelszó" });
    }

    try {
        
        let connection = await mysql.createConnection(config.database);

        const [rows] = await connection.query('SELECT login(?, ?) AS id', [email, jelszo]);
        const userId = (rows as any)[0]?.id;
        console.log("SQL eredmény:", rows);


        if (!userId || userId === 0) {
            return res.status(401).json({ error: "Hibás felhasználónév vagy jelszó!" });
        }

        if (!config.jwtSecret) {
            return res.status(500).json({ error: "Hiba a titkos kulcsnál" });
        }

        const token = jwt.sign({ id: userId }, config.jwtSecret as string, { expiresIn: "2h" });

        return res.status(200).json({ token });
        

    } catch (err) {
        console.error("Login hiba:", err);
        return res.status(500).json({ error: "Hiba a bejelentkezés közben" });
    } 
    
};

export const getAllAutok = async (req: Request, res: Response) => {
    
    try {
        let connection = await mysql.createConnection(config.database);
        const [rows] = await connection.query("SELECT * FROM autok");

        const autok = (rows as any).map((row: any) => ({
            id: row.id,
            tipus: row.tipus,
            rendszam: row.rendszam,
            evjarat: row.evjarat,
            szin: row.szin,
            kep: row.kep,
        }));

        return res.status(200).json(autok);
    } catch (err) {
        console.error("Autók lekérés hiba:", err);
        return res.status(500).json({ error: "Hiba az autók lekérésekor" });
    } 
};

export const getAutoById = async (req: Request, res: Response) => {
    const autoId = req.params.id;

    if (!autoId) {
        return res.status(400).json({ error: "Hiányzó autó ID" });
    }

    try {
        let connection = await mysql.createConnection(config.database);
        const [rows] = await connection.query("SELECT * FROM autok WHERE id = ?", [autoId]);

        if ((rows as any).length === 0) {
            return res.status(404).json({ error: "Autó nem található" });
        }

        const auto = (rows as any)[0];
        return res.status(200).json({
            id: auto.id,
            tipus: auto.tipus,
            rendszam: auto.rendszam,
            evjarat: auto.evjarat,
            szin: auto.szin,
            kep: auto.kep,
        });
    } catch (err) {
        console.error("Autó lekérés hiba:", err);
        return res.status(500).json({ error: "Hiba az autó lekérésekor" });
    }
};

export const createAuto = async (req: Request, res: Response) => {
    const { tipus, rendszam, evjarat, szin } = req.body;

    if (!tipus || !rendszam || !szin) {
        return res.status(400).json({ error: "Hiányzó kötelező adatok!" });
    }

    try {
        let connection = await mysql.createConnection(config.database);
        const [result] = await connection.query(
            `INSERT INTO autok (tipus, rendszam, evjarat, szin) VALUES (?, ?, ?, ?)`,
            [tipus, rendszam.toUpperCase(), evjarat || null, szin]
        );

        const insertId = (result as any).insertId;
        return res.status(201).json({ id: insertId });
    } catch (err) {
        console.error("Hiba az autó rögzítése közben:", err);
        return res.status(500).json({ error: "Hiba az autó rögzítése közben" });
    } 
};

export const updateAuto = async (req: Request, res: Response) => {
    const autoId = req.params.id;
    const allowedFields = ["tipus", "rendszam", "evjarat", "szin"];
    const updates: any = {};

    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Az adatok nem megfelelőek!" });
    }

    try {
        let connection = await mysql.createConnection(config.database);

        const [rows] = await connection.query("SELECT id FROM autok WHERE id = ?", [autoId]);
        if ((rows as any).length === 0) {
            return res.status(404).json({ error: "Az elem nem létezik" });
        }
        const setClause = Object.keys(updates).map(key => `${key} = ?`).join(", ");
        const values = Object.values(updates);

        if (updates.rendszam) {
            values[Object.keys(updates).indexOf("rendszam")] = updates.rendszam.toUpperCase();
        }

        await connection.query(`UPDATE autok SET ${setClause} WHERE id = ?`, [...values, autoId]);

        return res.status(201).json({ message: "Sikeres módosítás" });
    } catch (err) {
        console.error("Hiba az autó módosítása közben:", err);
        return res.status(500).json({ error: "Hiba az autó módosítása közben" });
    } 
};

export const deleteAuto = async (req: Request, res: Response) => {
    const autoId = req.params.id;

    if (!autoId) {
        return res.status(400).json({ error: "Az autó ID hiányzik" });
    }

    try {
        let connection = await mysql.createConnection(config.database);

        const [rows] = await connection.query('SELECT id FROM autok WHERE id = ?', [autoId]);
        const auto = (rows as any)[0];
        if (!auto) {
            return res.status(404).json({ error: "Az autó nem létezik" });
        }

        await connection.query('DELETE FROM autok WHERE id = ?', [autoId]);
        return res.status(204).json(); 

    } catch (err) {
        console.error("Autó törlés hiba:", err);
        return res.status(500).json({ error: "Hiba az autó törlése közben" });
    }
};

export const postKolcsonzes = async (req: Request, resp: Response) => {
    const autoid: number = parseInt(req.params.autoid);

    if (isNaN(autoid)) {
        return resp.status(400).json({ error: "Nincs ilyen ID" });
    }

    const berloid = (req as any).user?.id;
    if (!berloid) {
        return resp.status(401).json({ error: "Bejelentkezés szükséges!" });
    }

    const { berletkezdete, napokszama, napidij } = req.body;

    if (!berletkezdete || !napokszama || !napidij) {
        return resp.status(400).json({ error: "Nincs elég adat" });
    }

    try {
        const connection = await mysql.createConnection(config.database);

        const [autoRows] = await connection.query("SELECT id FROM autok WHERE id = ?", [autoid]);
        if ((autoRows as any).length === 0) {
            await connection.end();
            return resp.status(404).json({ error: "Az autó nem található" });
        }

        const [results] = await connection.query(
            "INSERT INTO kolcsonzes VALUES (null, ?, ?, ?, ?, NULL, ?)",
            [berloid, autoid, berletkezdete, napokszama, napidij]
        ) as Array<any>;

        await connection.end();
        return resp.status(201).json({ kid: results.insertId });

    } catch (error) {
        console.error( error);
        return resp.status(500).json({ error: "Hiba a kölcsönzés létrehozása közben" });
    }
};

export const getKolcsonzes = async (req: Request, resp: Response) => {
    const autoId: number = parseInt(req.params.id);
    const { datum, napokszama } = req.body;

    if (isNaN(autoId)) {
        return resp.status(400).json({ error: "Helytelen ID" });
    }

    if (!datum || !napokszama) {
        return resp.status(400).json({ error: "Hiányzó adatok!" });
    }

    try {
        let connection = await mysql.createConnection(config.database);

        const [results] = await connection.query(
            `SELECT szabade(?,?,?) as kolcsonozheto`,
            [autoId, datum, napokszama]
        ) as Array<any>;

        const kolcsonozheto = !results[0].kolcsonozheto;
        return resp.status(200).json({ kolcsonozheto });
    } catch (err) {
        console.error(err);
        return resp.status(500).json({ error: "Hiba az autó lekérdezésekor" });
    }
};