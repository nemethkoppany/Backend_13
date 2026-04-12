import jwt from "jsonwebtoken";
import mysql from "mysql2/promise"
import config from "./config";

export const login = async(req:any, res:any) =>{
 const {email, password} = req.body   

 const connection = await mysql.createConnection(config.database);
 try{

    const [result]:any = await connection.query(`
            SELECT login(?,?) as id
            `,[email,password])

            const token = jwt.sign({userId:result[0].id},config.JwtSecret,{expiresIn:"2h"})

            return res.status(200).json(token);
 }
 catch(err){
    console.log(err)
 }
}