import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import config from "./config";

export const login = async (req:any, res:any) =>{
    const {email, password} = req.body

    const connection = await mysql.createConnection(config.database);
    try{

        const [results]:any = await connection.query(`
                SELECT login(?,?) as id
            `,[email,password])


            if(!results[0].id){
                return res.status(401).json({error:"Hibás email vagy jelszó"});
            }

            const token = jwt.sign({userId:results[0].id},config.JwtSecret,{expiresIn:"2h"});

            return res.status(200).json({token:token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Szerver hiba"});
    }
}

export const getAll = async (_req:any, res:any) =>{
    const connection = await mysql.createConnection(config.database);

    try{

        const [results]:any = await connection.query(`
            SELECT * from pet;
            `)

            if(results.length === 0){
                return res.status(404).json("Üres adatbázis");
            }

            return res.status(200).json(results);

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Szerver hiba"});
    }
}

export const getById = async (req:any, res:any) =>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(404).json("Nincs ilyen id");
    }

    const connection = await mysql.createConnection(config.database);
    try{
          const [results]:any = await connection.query(`
            SELECT * from pet WHERE id = ?
            `,[id])

            if(results.length === 0){
                return res.status(404).json("Nincs ilyen pet");
            }

            return res.status(200).json(results);
    }
    catch(err){
         console.log(err);
         return res.status(500).json({error:"Szerver hiba"});
    }
}

export const deletePet = async (req:any, res:any) =>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(404).json("Nincs ilyen id");
    }

    const connection = await mysql.createConnection(config.database);
    try{
          const [results]:any = await connection.query(`
            DELETE from pet WHERE id = ?
            `,[id])

            if(results.affectedRows === 0){
                return res.status(400).json("Nincs ilyen pet");
            }

            return res.status(200).json("Törölve");
    }
    catch(err){
         console.log(err);
         return res.status(500).json({error:"Szerver hiba"});
    }
}

export const insertPet = async (req:any, res:any) =>{

    const connection = await mysql.createConnection(config.database);
    try{
        if(!req.body.nev || !req.body.leiras || isNaN(Number(req.body.ar)) || isNaN(Number(req.body.raktaron))){
        return res.status(400).json("Hiányos vagy rossz formátum");
        }

          const [_results]:any = await connection.query(`
            INSERT INTO pet VALUES(NULL,?,?,?,?,?)
            `,[req.body.nev,req.body.leiras,Number(req.body.ar),Number(req.body.raktaron),req.body.kep])

            return res.status(201).json("Hozzáadva");
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Szerver hiba"});
    }
}


export const updatePet= async(req:any,res:any)=>{
    const id = Number(req.params.id);
    const {nev, leiras, ar, raktaron, kep} = req.body

     if (isNaN(id)) {
        return res.status(400).json({ error: "Hibás ID" });
    }

    if (!nev || !leiras || ar === undefined || raktaron === undefined) {
        return res.status(400).json({ error: "Minden mező kötelező (PUT)" });
    }

      const connection = await mysql.createConnection(config.database);

    try {
        const [results]: any = await connection.query(`
            UPDATE pet SET nev = ?, leiras = ?, ar = ?, raktaron = ?, kep = ? WHERE id = ?
            `,[nev,leiras,Number(ar),Number(raktaron),kep,id])
      

            if(results.affectedRows === 0)
                return res.status(404).json("Hiba");

        return res.status(200).json({ message: "Update kész"});

    } catch (err: any) {
        console.log(err);
        return res.status(500).json({ error: "Szerver hiba" });

    }
}