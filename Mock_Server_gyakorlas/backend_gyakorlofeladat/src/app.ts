import express from "express"
import cors from "cors"
import router from "./router"


const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/", router)

export default app;