import jwt from "jsonwebtoken"
import config from "./config"
import { convertTypeAcquisitionFromJson } from "typescript"

export const verifyToken = (req:any, res:any, next:any) =>{

    const token = req.body.token

    try{

        if(!token){
            return res.status(404).json("Nincs token")
        }

        const decodedToken = jwt.verify(token,config.JwtSecret);

        req.user = decodedToken

        return next();

    }
    catch(err){
        console.log(err);
    }
}