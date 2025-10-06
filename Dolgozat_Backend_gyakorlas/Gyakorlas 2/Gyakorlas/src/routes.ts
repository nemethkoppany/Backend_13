import { Router } from "express"
import {
  run,getAllProducts,getProductById,insertProduct,updateProduct,patchProduct,deleteProduct} from "./controller"

const router = Router()

router.get("/", run)
router.get("/products", getAllProducts)
router.get("/products/:id", getProductById)
router.post("/products", insertProduct)
router.put("/products/:id", updateProduct)
router.patch("/products/:id", patchProduct)
router.delete("/products/:id", deleteProduct)

export default router
