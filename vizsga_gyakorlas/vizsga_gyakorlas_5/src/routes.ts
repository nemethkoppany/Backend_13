import { Router } from "express";
import { Login ,getAll} from "./controller";
import { verfiyToken } from "./auth";

const router = Router();
router.post("/login",Login);
router.get("/getAll", verfiyToken, getAll);

export default router;