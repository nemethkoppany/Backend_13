import { Router } from "express";
import { login,insertPet,updatePet } from "./controller";

const router = Router();

router.post("/login",login)
router.post("/insertpet",insertPet);
router.put("/update",updatePet);
export default router;