import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import config from "./config";

export const login = async(req:any, res:any) => {
    const {email, password } = req.body
    const connection = await mysql.createConnection(config.database)
    try{
        const [result]:any =  await connection.query(`
            SELECT login(?,?) as id
            `,[email,password])

                if(!result[0].id){
                    return res.status(404).json("Nincs id");
                }

            const token = jwt.sign({userId:result[0].id},config.JwtSecret,{expiresIn:"2h"})

        return res.status(200).json({token:token});
    }
    catch(err){
        console.log(err);
    }
}

export const insertPet = async(req:any, res:any) => {
    const connection = await mysql.createConnection(config.database)
    try{
        if(!req.body.nev || !req.body.leiras || isNaN(req.body.ar) ||isNaN(req.body.raktaron)||!req.body.kep){
            return res.status(404).json("Valami hiányzik");
        }
        const [_result]:any = await connection.query(`
                INSERT INTO pet VALUES(NULL,?,?,?,?,,)
            `[req.body.nev,req.body.leiras,Number(req.body.ar),Number(req.body.raktaron),req.body.kep])

            return res.status(200).json("Hozzáadva")

    }
    catch(err){
        console.log(err);
    }
}

export const updatePet = async (req:any, res:any) =>{
    const id = Number(req.params.id)
    const {nev, leiras, ar, raktaron, kep} = req.body;
    
    const connection = await mysql.createConnection(config.database);

    try{
        const [result]:any = await connection.query(`
            UPDATE pet SET nev = ?, leiras = ?, ar = ?, raktaron = ?, kep = ? WHERE id = ?
            `,[nev,leiras,Number(ar),Number(raktaron),kep,id])


            if(result.affectedRows === 0){
                return res.status(403).json("Valami nem jó");
            }

            return res.status(200).json("megváltoztatva");
    }
    catch(err){
        console.log(err);
    }
}