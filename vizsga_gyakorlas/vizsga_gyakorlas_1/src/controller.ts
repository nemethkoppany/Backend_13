import config from "./config";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken"


export const signIn = async(req:any, res:any) =>{
    const {email, password} = req.body;
    const connection = await mysql.createConnection(config.database);

    try{
        const [rows]:any = await connection.query(
            "SELECT login(?,?) AS id",[email, password]
        );

        if(!rows[0].id){
            return res.status(401).json({error:"Nincs ilyen felhasználó"});
        }

        const token = jwt.sign(
            {userId: rows[0].id},
            config.jwtSecret,
            {expiresIn:"2h"}
        );

        return res.json({token});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:"Szerver hiba"});
    }
    finally{
        await connection.end();
    }
}

export const getAllpet = async (req:any, res:any) =>{
 const connection = await mysql.createConnection(config.database)
 try{
   const [result]:any = await connection.query(
    "SELECT * FROM pet"
);

    return res.status(201).json(result);
 }   
 catch(err){
    console.error(err);
 }
}

export const deletePet = async (req:any, res:any) => {
    const id = parseInt(req.params.id);

    const connection = await mysql.createConnection(config.database);

    try {
        const [result]: any = await connection.query(
            "DELETE FROM pet WHERE id = ?", [id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({error:"Nincs ilyen pet"});
        }

        return res.status(204).send("Törölve");
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:"Szerver hiba"});
    }
}

export const insertPet = async(req:any, res:any) =>{
    const connection = await mysql.createConnection(config.database);
    try{
        const [result]:any = await connection.query(
            "INSERT INTO pet VALUES(NULL, ?,?,?,?,?)",[req.body.nev, req.body.leiras,parseInt(req.body.ar), req.body.raktaron, req.body.kep]
        )

        if(result.affectedRows === 0){
            return res.status(401).json("Nem sikerült a beszúrás")
        }
        if(result.insertId){
            res.status(200).json("Sikerült");
        }
    }
    catch(err){
        console.error(err)
    }
}