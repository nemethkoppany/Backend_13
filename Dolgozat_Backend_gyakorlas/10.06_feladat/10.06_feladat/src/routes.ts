import { Router } from "express";
import {server_run,getAllData,getDataById,deleteData,postData,patchData,putData} from "./controller"

const router = Router()

router.get("/",server_run);
router.get("/data",getAllData);
router.get("/data/:id",getDataById);
router.delete("/data/:id",deleteData);
router.post("/data",postData);
router.patch("/data/:id",patchData);
router.put("/data/:id",putData)


export default  router