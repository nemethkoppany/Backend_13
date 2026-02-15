import config from "./config";
import jwt from "jsonwebtoken";

const verifyToken = async(req:any, res:any, next: any) =>{
    const token = req.body.token;

    try{
        if(!token){
            console.log("Nincs token")
        }

        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.user = decodedToken;

        return next();
    }
    catch(err){
        console.error(err);
    }
}

export default verifyToken;