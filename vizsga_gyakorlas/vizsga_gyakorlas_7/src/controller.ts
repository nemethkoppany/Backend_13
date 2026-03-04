import jwt  from "jsonwebtoken";
import config from "./config";
import mysql from "mysql2/promise"

export const login = async(req:any, res:any ) =>{
    const {email,password} = req.body;


    const connection = await mysql.createConnection(config.database);
    try{

        const [results]:any = await connection.query(`
                SELECT login(?,?) as id
            `,[email,password])

            if(!results[0].id){
                return res.status(400).json("Hiba")
            }

            const token = jwt.sign({userId:results[0].id},config.JwtSecret,{expiresIn:"2h"})

            return res.status(200).json({token:token})
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Szerver hiba");
    }
}