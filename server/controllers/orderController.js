import Order from "../models/Order.js";
import stripe from "stripe";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingDetails,
      paymentMethod,
      totalAmount,
      paymentMethodId,
    } = req.body;

    let paymentResult = {};

    if (paymentMethod === "card") {
      // Process payment with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // Stripe expects amount in cents
        currency: "pkr",
        payment_method: paymentMethodId,
        confirm: true,
      });

      paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: shippingDetails.email,
      };
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingDetails,
      paymentMethod,
      paymentResult,
      totalAmount,
      status: paymentMethod === "cod" ? "pending" : "processing",
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders (admin only)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
