import jwt from "jsonwebtoken";
import config from "./config";

const verfiyToken = async(req:any, _res:any, next:any) =>{

    const token = req.body.token
    try{
        if(!token){
            console.log("Nincs token")
        }

        const decodedToken = jwt.verify(token,config.jwtSecret);
        req.user = decodedToken

        return next();

    }
    catch(e){
        console.log(e)
    }
}

export default verfiyToken;

