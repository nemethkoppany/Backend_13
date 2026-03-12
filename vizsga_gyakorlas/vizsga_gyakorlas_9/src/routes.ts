import { Router } from "express";
import { login, getAll,getById,deletePet,insertPet,updatePet } from "./controller";

const router = Router();

router.post("/login",login);
router.get("/getAll",getAll);
router.get("/getID/:id",getById);
router.delete("/deletePet/:id",deletePet);
router.post("/insertPet",insertPet);
router.put("/updatePet/:id",updatePet);


export default router;