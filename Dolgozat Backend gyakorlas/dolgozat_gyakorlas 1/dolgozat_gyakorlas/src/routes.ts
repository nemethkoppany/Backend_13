import { Router } from "express";
import {putDatafromId, DeleteDatafromId, getAllData, getAllDatafromId, InsertDatafromId, run, patchData } from "./controller";

const router = Router();

router.get("/", run);
router.get("/data", getAllData);
router.get("/data/:id", getAllDatafromId);
router.post("/data", InsertDatafromId);
router.delete("/data/:id", DeleteDatafromId);
router.put("/data/:id", putDatafromId);
router.patch("/data/:id", patchData);

export default router;