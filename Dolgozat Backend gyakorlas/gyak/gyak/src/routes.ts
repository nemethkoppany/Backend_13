import {deletDataById, getAllData, getDataById , postData,  patchDataById, putDataById, server_running} from "./controller"
import { Router } from "express"

const router = Router()

router.get("/", server_running)
router.get("/data", getAllData)
router.get("/data/:id", getDataById)
router.delete("/data/:id", deletDataById)
router.post("/data",postData)
router.patch("/data/:id",patchDataById)
router.put("/data/:id",putDataById)



export default router