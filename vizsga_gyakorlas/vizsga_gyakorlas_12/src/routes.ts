import { Router } from "express";
import { login, getProducts,getProductsById,postProduct,putProducts,patchProducts } from "./controller";
import { verifyToken } from "./auth";

const router = Router();

router.post("/api/login",login);
router.get("/api/products",getProducts);
router.get("/api/products/:id",getProductsById);
router.post("/api/products",verifyToken,postProduct);
router.put("/api/products/:id",putProducts);
router.patch("/api/products/:id",verifyToken,patchProducts);
export default router;