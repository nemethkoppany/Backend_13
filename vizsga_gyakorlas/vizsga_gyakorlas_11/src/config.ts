import env from "dotenv";

env.config();

class DBConfig{
    constructor(){
        return{
            host: process.env.DB_HOST,
            user:process.env.DB_USER,
            database: process.env.DATABASE,
            password: process.env.DB_PASSWORD
        }
    }
}

const config = {
    database: new DBConfig(),
    JwtSecret: process.env.JWT_SECRET!
}

export default config;