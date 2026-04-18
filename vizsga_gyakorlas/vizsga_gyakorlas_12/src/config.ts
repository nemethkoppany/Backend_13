import env from "dotenv";

env.config();

class DBConfig{
    constructor(){
        return{
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DATABASE,
            password: process.env.DB_PASSWORD
        }
    }
}

const config = {
    database: new DBConfig(),
    JwtToken: process.env.JWT_TOKEN!
};

export default config;

