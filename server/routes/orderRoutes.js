import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById,
  getUserOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/user").get(getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

export default router;
