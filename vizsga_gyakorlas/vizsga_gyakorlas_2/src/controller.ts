import config from "./config";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

export const signin = async(req:any, res:any) =>{
    const {email, password} = req.body;

    const connection = await mysql.createConnection(config.database);

    try{
        const [result]:any = await connection.query(`
                SELECT login(?,?) as id
            `,[email, password])

            if(!result[0].id){
                console.log("Nincs id")
            }
            if(!config.jwtSecret){
                console.log("Nincs token")
            }

            const token = jwt.sign({userId: result[0].id},config.jwtSecret,{expiresIn:"2h"});
            res.status(200).send({token: token});
    }
    catch(err){
        console.log(err)
    }
}

export const getAllPets = async(req: any, res:any) =>{
    const connection = await  mysql.createConnection(config.database)

    try{
        const [result]:any = await connection.query(`
            SELECT * from pet
            `)
            return res.status(200).send(result);

    }
    catch(err){
        console.error(err);
    }
}

export const deletePet = async(req:any, res:any ) =>{

    const id = parseInt(req.params.id);

    const connection = await mysql.createConnection(config.database);

    try{
        const [result]:any = await connection.query(`
            DELETE FROM pet WHERE id = ?
            `,[id])

            if(result.affectedRows === 0){
                return res.status(404).send("Nem található ez az id");
            }

            return res.status(201).send("Sikerült");
    }catch(err){console.error(err)}
}

export const insertPet = async(req:any, res:any) =>{
    const connection = await mysql.createConnection(config.database)

    try{
        const [result]:any = await connection.query(`
            INSERT INTO pet VALUES(NULL, ?, ?,?,?,?)
                `,[req.body.nev, req.body.leiras, parseInt(req.body.ar), req.body.raktaron, req.body.kep])

                if(result.affectedRows === 0){
                    return res.status(404).send("Nem sikerült beszúrni")
                }

                if(result.insertId){
                    return res.status(200).send("Sikerült");
                }
    }catch(err){console.error(err)}
}