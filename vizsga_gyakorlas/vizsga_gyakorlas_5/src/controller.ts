import jwt from "jsonwebtoken"
import mysql from "mysql2/promise"
import config from "./config"

export const Login = async(req:any, res:any) =>{
    const {email, password} = req.body;

    const connection = await mysql.createConnection(config.databse);
    try{
        const [results]:any = await connection.query(`
            SELECT login(?,?) as id`,[email,password])

            const token = jwt.sign({userId: results[0].id}, config.JwtSecret, {expiresIn:"2h"})
            res.status(200).json({token: token})
    }
    catch(err){
        console.log(err)
    }
}

export const getAll = async (req:any, res:any) =>{
    const connection = await mysql.createConnection(config.databse)

    try{
        const [results]:any = connection.query(`
                SELECT * from pet
            `)

            res.status(200).json(results);
    }
    catch(err){
        console.log(err);
    }
}