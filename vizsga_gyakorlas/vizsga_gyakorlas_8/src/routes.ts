import { Router } from "express";
import { login, insertPet } from "./controller";


const router = Router();

router.post("/login",login)
router.post("/insert",insertPet);

export default router;