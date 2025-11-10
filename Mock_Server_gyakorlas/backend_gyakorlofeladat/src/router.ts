import Router from "express"
import { DeleteData, getAllData, getDataFromId, InsertData, PatchData, PutData, run } from "./controller";

const router = Router()
router.get("/", run);
router.get("/macsekok", getAllData)
router.get("/macsekok/:id", getDataFromId)
router.post("/macsekok", InsertData)
router.delete("/macsekok/:id", DeleteData)
router.put("/macsekok/:id", PutData)
router.patch("/macsekok/:id", PatchData)
export default router;