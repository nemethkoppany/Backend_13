import { Router } from "express";
import { login, getAllAutok, getAutoById, createAuto,updateAuto, deleteAuto,postKolcsonzes,getKolcsonzes } from "./controller";
import verifyToken from "./auth";

const router = Router();

router.post("/api/login", login);
router.get("/api/auto", getAllAutok);
router.get("/api/auto/:id", getAutoById);
router.post("/api/auto", createAuto);
router.put("/api/auto/:id", updateAuto);
router.delete("/api/auto/:id", deleteAuto);
router.post("/api/kolcsonzes/:autoid",verifyToken,postKolcsonzes);
router.get("/api/kolcsonzes/auto/:id",verifyToken,getKolcsonzes);

export default router;
