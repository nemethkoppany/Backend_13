import config from "./config";
import jwt from "jsonwebtoken"

const verfiyToken = async(req:any, res:any, next:any) =>{
    const token = req.body.token
    try{
        if(!token){
            console.log("Nincs token");

            const decodedToken = jwt.verify(token, config.JwtSecret);
            req.user = decodedToken;

            return next();
        }
    }
    catch(err){
        console.log(err);
    }
}

export default verfiyToken;