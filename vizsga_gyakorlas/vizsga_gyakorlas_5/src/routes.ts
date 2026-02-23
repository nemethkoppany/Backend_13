import { Router } from "express";
import { Login ,getAll,getById,deletePet,insertPet,updatePetPut} from "./controller";
import { verfiyToken } from "./auth";

const router = Router();
router.post("/login",Login);
router.get("/getAll", verfiyToken, getAll);
router.get("/getById/:id",getById)
router.delete("/delete/:id",deletePet);
router.post("/insert",insertPet);
router.put("/put/:id",updatePetPut);
export default router;