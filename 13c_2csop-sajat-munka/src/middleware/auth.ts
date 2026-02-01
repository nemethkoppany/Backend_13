import jwt from "jsonwebtoken"
import config from "../config/config"
 
const verifyToken = (req:any,res:any,next:any) => {
    const token = req.body?.token || req.query?.token || req.headers?.['x-access-token']
    if (!token) {
        return res.status(403).send("Token szükséges")
    }
    try {
         if (!config.jwtSecret) {
        return res.status(403).send("Hiba van a titkos kulccsal")
         }
        
const decodedToken = jwt.verify(token,config.jwtSecret)

        req.user = decodedToken
        return next()
    }
    catch (e) {
        console.log(e)
    }
    res.status(401).send("Az auth nem sikerült!")
}
 
export const verifySocketToken = (socket: any, req: any) => {
  try {
    const url = new URL(req.url, "ws://localhost");

    const token = url.searchParams.get("token");
    const roomId = url.searchParams.get("roomId");

    if (!token || !roomId) {
      socket.close();
      return false;
    }

    if (!config.jwtSecret) {
      socket.close();
      return false;
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);

    socket.user = decodedToken;
    socket.roomId = Number(roomId);

    return true;
  } catch (e) {
    console.log(e);
    socket.close();
    return false;
  }
};
 
 
 
 
export default verifyToken;