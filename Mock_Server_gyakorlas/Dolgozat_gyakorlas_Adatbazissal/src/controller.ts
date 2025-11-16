import {Request, Response } from "express";
import config from "./config";
import Cat, { ICat } from "./cat";
import mysql from "mysql2/promise";

export const run = (req: Request, res: Response) => {
  res.status(200).json("A szerver fut");
};

export const getAllData = async (req:Request, res:Response) =>{
    const connection = await mysql.createConnection(config.database)
    try{
        const [results] = await connection.query(
            "Select * from cat"
        )
        res.status(200).json(results);
    }    
    catch(err){
        console.log(err)
        res.status(404).json("Nem találhatók az adatok");
    }
}

export const getDataById = async (req:Request, res:Response) =>{
    let id = parseInt(req.params.id);

    if(isNaN(id)){
        res.status(404).json("Az elem nem található");
    }
    const connection = await mysql.createConnection(config.database);

    try{
        const [result] = await connection.query(
            "Select * from cat where id = ?",[id]
        )as Array<any>
        if(result.length > 0){
            res.status(200).json(result[0]);
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json("Az elem nem található")
    }
}

export const posttData = async (req:Request,res:Response)=>{
    let cat = new Cat(req.body as ICat);
    if(!cat){
        res.status(200).json("Nem adtál meg adatokat a törzsben")
        return;
    }

    if(cat.name === " " || cat.breed === " "){
        res.status(200).json("Nem adtál meg elég adatot");
        return;
    }
    const connection = await mysql.createConnection(config.database);
    try{
        const [results] = await connection.query(
            "Insert into cat value(null,?,?,?,?,?)",[cat.name,cat.breed,cat.gender ? 1:0, parseInt(cat.age as unknown as string),cat.pictururl]
        )as Array<any>
        res.status(200).json(results.insertId)
    }
    catch(err){
        console.log(err)
        res.status(404).json("Nem találhatók az adatok")
    }
}

export const deleteData = async (req:Request, res:Response) =>{
    let id = parseInt(req.params.id);

    if(isNaN(id)){
        res.status(404).json("Az adatok nem találhatók")
    }
    const connection = await mysql.createConnection(config.database);
    try{
        const [results] = await connection.query(
            "Delete from cat where id = ?",[id]
        )as Array<any>
        if(results.affectedRows > 0){
            res.status(200).json(`Sikeresen törölt ${results.affectedRows} elemet`)
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json("Nem sikerült törölni")
    }
}

export const patchData = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const cat:any = new Cat(req.body as ICat);

    if (isNaN(id)) {
        return res.status(400).json("Hibás paraméter");
    }

    if(!cat){
        res.status(400).send("Nem adtál meg adatokat a törzsben");
        return
    }
    const allowedFields = ["name", "breed", "gender", "age", "picurl"];
    const keys = Object.keys(cat).filter(key => allowedFields.includes(key));

    if (keys.length === 0) {
        return res.status(400).json({ error: 103, message: "Nincs frissítendő mező" });
    }

    const updateString = keys.map(key => `${key} = ?`).join(", ");
    const values = keys.map(key => cat[key]);
    values.push(id);

    const sql = `UPDATE cat SET ${updateString} WHERE id = ?`;
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(sql, values) as any;

        if (results.affectedRows > 0) {
            return res.status(200).json(`Sikeresen frissített ${results.affectedRows} rekordot`);
        } else {
            return res.status(404).json("Az elem nem található");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json("Hiba történt a frissítés során");
    }
};

export const PutData = async (req: Request, resp: Response) => {
    let id: number = parseInt(req.params.id);
    const cat: any = new Cat(req.body as ICat);

    if (isNaN(id)) {
        resp.status(400).send("Hibás paramétert adtál meg!");
        return;
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        resp.status(400).send("Nem adtál meg adatokat a törzsben");
        return;
    }

    const allowedFields = ["name", "breed", "gender", "age", "picurl"];
    const keys = Object.keys(cat).filter((key) => allowedFields.includes(key));

    if (keys.length === 0) {
        resp.status(400).send({ error: 103, message: "Nincs frissítendő mező!" });
        return;
    }

    const updateString = keys.map((key) => `${key} = ?`).join(", ");
    const values = keys.map((key) => cat[key]);
    values.push(id);

    const sql = `UPDATE cat SET ${updateString} WHERE id = ?`;
    const connection = await mysql.createConnection(config.database);

    try {
        const [existing] = await connection.query("SELECT * FROM cat WHERE id = ?", [id]) as any;

        if (existing.length > 0) {
            const [results] = await connection.query(sql, values) as any;
            if (results.affectedRows > 0) {
                const [updated] = await connection.query("SELECT * FROM cat WHERE id = ?", [id]) as any;
                resp.status(200).json({
                    message: `Sikeresen frissítve (${results.affectedRows} elem)`,
                    data: updated[0],
                });
                return;
            } else {
                resp.status(400).json("Nem történt módosítás");
                return;
            }
        } else {
            const insertSql = `
                INSERT INTO cat (id, name, breed, gender, age, picurl)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const insertValues = [
                id,
                cat.name,
                cat.breed,
                cat.gender ? 1 : 0,
                parseInt(cat.age as unknown as string),
                cat.picurl,
            ];

            await connection.query(insertSql, insertValues);
            const [newCat] = await connection.query("SELECT * FROM cat WHERE id = ?", [id]) as any;

            resp.status(201).json({
                message: "Új rekord létrehozva (PUT → INSERT)",
                data: newCat[0],
            });
            return;
        }
    } catch (err) {
        console.log("Hiba PUT során:", err);
        resp.status(500).json({ error: "Adatbázis hiba történt a PUT művelet közben" });
    } finally {
        await connection.end();
    }
};
