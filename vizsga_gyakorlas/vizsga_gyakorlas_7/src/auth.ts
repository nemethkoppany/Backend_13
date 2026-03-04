import config from "./config";
import jwt from "jsonwebtoken";

export const verifyToken = async(req:any, res:any, next:any) =>{
    const token = req.body.token;

    try{
        if(!token){
            res.status(404).json("Nincs token");
        }

        const decodeToken = jwt.verify(token,config.JwtSecret);
        req.user = decodeToken;

        return next();


    }   
    catch(err){
        console.log(err);
    }
}