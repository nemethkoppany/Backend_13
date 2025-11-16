import { Router } from "express";

import { run,getAllData,getDataById,posttData,deleteData,patchData,PutData } from "./controller";

const router = Router();
router.get("/", run);
router.get("/data",getAllData);
router.get("/data/:id",getDataById);
router.post("/macska",posttData);
router.delete("/delete/:id",deleteData)
router.patch("/patch/:id",patchData);
router.put("/put/:id",PutData);

export default router;
