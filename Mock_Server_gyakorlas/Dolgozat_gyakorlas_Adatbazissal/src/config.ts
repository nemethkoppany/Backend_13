import dotenv from "dotenv";
dotenv.config();

class DBConfig {
    constructor() {
        return {
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD, // helyesírás
            database: process.env.DATABASE,    // helyesírás
        };
    }
}

const config: any = {
    database: new DBConfig()
};

export default config;
