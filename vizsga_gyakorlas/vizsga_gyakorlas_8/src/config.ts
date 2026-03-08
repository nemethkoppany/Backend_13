import env from "dotenv"

env.config();

class DBConfig{
    constructor(){
        return{
            host:process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        }
    }
}

const config = {
    database: new DBConfig(),
    JwtSecret: process.env.JWT_SECRET!
}

export default config;