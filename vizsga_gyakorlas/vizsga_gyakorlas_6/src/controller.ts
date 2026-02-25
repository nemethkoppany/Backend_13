import jwt from "jsonwebtoken";
import config from "./config";
import mysql from "mysql2/promise";

export const login = async (req:any, res:any) => {
    const {email, password} = req.body;

    const connection = await mysql.createConnection(config.database);

    try{
        const [result]:any = await connection.query(`
            SELECT login(?,?) as id
            `,[email,password])

            if(!result[0].id){
                res.status(404).json("nincs id")
            }

            const token = jwt.sign({userId:result[0].id},config.JwtSecret,{expiresIn:"2h"})
            res.status(200).json({token:token})
    }catch(err){console.log(err)}
}