import config from "./config";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

export const login = async(req:any, res:any )=>{
    const {email, password} = req.body;

    const connection = await mysql.createConnection(config.database);

    try{
        const [results]:any = await connection.query(`
            SELECT login(?,?) as id
            `,[email,password])

            const token = jwt.sign({userId:results[0].id},config.JwtSecret,{expiresIn:"2h"})
            res.status(200).send({token:token})
    }
    catch(err){
        console.log(err);
    }
}