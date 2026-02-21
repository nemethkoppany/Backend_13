import jwt from "jsonwebtoken"
import config from "./config"
import mysql from "mysql2/promise"

export const login = async (req:any, res:any) =>{
    const {email, password} = req.body;

    const connection = await mysql.createConnection(config.database);

    try{

        const [results]:any = await connection.query(`
            SELECT login(?,?) as id
            
            `,[email,password])

            const token = jwt.sign({userId:results[0].id},config.jwtSecret,{expiresIn:"2h"});
            res.status(200).send({token: token});
    }
    catch(e){
        console.log(e);
    }
}

export const getAllitems = async (_req:any, res:any) =>{
    const connection = await mysql.createConnection(config.database)

    try{
        const [results]:any = await connection.query(`
            SELECT * from pet
            `)

           return res.status(200).json(results);
    }
    catch(e){
        console.log(e);
    }
}