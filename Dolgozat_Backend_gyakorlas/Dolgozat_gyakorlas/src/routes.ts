import {Router} from 'express'
import { server_run,allData,dataById,postData,deleteData,patchData,putData } from './controller';


const router = Router();

router.get("/", server_run)
router.get("/data", allData)
router.get("/data/:id",dataById)
router.post("/data",postData)
router.delete("/data/:id",deleteData)
router.patch("/data/:id",patchData)
router.put("/data/:id",putData)


export default router