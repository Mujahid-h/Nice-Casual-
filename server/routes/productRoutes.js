import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
