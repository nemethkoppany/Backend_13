import express from "express";
import cors from "cors";
import router from "./routes";
import bodyParser from "body-parser"

const app = express();
app.use(cors({origin:"*"}));

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/',router)

export default app