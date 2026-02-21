import verfiyToken from "./auth";
import { getAllitems, login } from "./controller"
import {Router} from "express"
// import verfiyToken from "./auth";


const router = Router();

router.post("/login",login);
router.get("/getAll",verfiyToken,getAllitems)

export default router;