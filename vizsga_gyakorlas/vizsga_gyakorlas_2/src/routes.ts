import { Router } from "express";
import {deletePet, getAllPets, insertPet, signin} from "./controller";
import verifyToken from "./auth";

const router = Router();

router.post("/signin",signin);
router.get("/getPet",verifyToken,getAllPets);
router.delete("/delete/:id",deletePet);
router.post("/insertPet",insertPet);

export default router;