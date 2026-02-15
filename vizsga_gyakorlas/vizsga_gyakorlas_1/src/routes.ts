import Router from "express";
import { deletePet, getAllpet, insertPet, signIn } from "../src/controller";
import verifiyToken from "./auth";

const router = Router()
router.post("/signin",signIn)
router.get("/pet",getAllpet);
router.delete("/deletePet/:id",deletePet);
router.post("/insert",insertPet);

export default router;