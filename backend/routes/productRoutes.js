import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.get("/", getProducts);
router.post("/", auth, createProduct);
export default router;
