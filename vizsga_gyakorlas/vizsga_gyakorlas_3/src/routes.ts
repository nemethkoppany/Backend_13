import { Router } from "express";

import {login} from "./controller"
import verifyToken from "./auth"

const router = Router();
router.post("/login",login)

export default router;