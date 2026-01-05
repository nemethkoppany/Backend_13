import jwt from "jsonwebtoken";
import config from "./config";

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.body?.token || req.query?.token || req.headers?.['x-access-token'];
    if (!token) {
        return res.status(403).json({ error: "Token szükséges a hozzáféréshez!" });
    }
    try {
        if (!config.jwtSecret) {
            return res.status(401).json({ error: "Hiba a titkos kulcsnál" });
        }
        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Hibás token" });
    }
};

export default verifyToken;
