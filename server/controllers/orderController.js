import Order from "../models/Order.js";

// Helper function to generate an invoice number
const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `INV-${timestamp}-${randomNum}`;
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingDetails, totalAmount } = req.body;

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    const order = new Order({
      user: req.user._id,
      items: items.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
      shippingDetails,
      totalAmount,
      invoiceNumber, // Add invoice number to the order
      status: "Pending", // Default order status
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Order creation failed:", error);
    res
      .status(400)
      .json({ message: "Order creation failed", error: error.message });
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

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
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

// import Order from "../models/Order.js";
// import stripe from "stripe";
// const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

// // Create new order
// export const createOrder = async (req, res) => {
//   try {
//     const {
//       items,
//       shippingDetails,
//       paymentMethod,
//       totalAmount,
//       paymentMethodId,
//     } = req.body;

//     console.log(req.body);

//     let paymentResult = {};
//     let orderStatus = "pending";

//     if (paymentMethod === "card") {
//       try {
//         // Create a PaymentIntent with the order amount and currency
//         const paymentIntent = await Stripe.paymentIntents.create({
//           amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
//           currency: "pkr",
//           payment_method: paymentMethodId,
//           confirm: true,
//           description: `Order for user ${req.user._id}`,
//         });

//         paymentResult = {
//           id: paymentIntent.id,
//           status: paymentIntent.status,
//           update_time: new Date().toISOString(),
//           email_address: shippingDetails.email,
//         };

//         // If payment is successful, set order status to processing
//         if (paymentIntent.status === "succeeded") {
//           orderStatus = "processing";
//         }
//       } catch (error) {
//         console.error("Stripe payment failed:", error);
//         return res
//           .status(400)
//           .json({ message: "Payment failed", error: error.message });
//       }
//     } else if (paymentMethod === "cod") {
//       // For COD, we'll keep the status as pending
//       orderStatus = "pending";
//     } else {
//       return res.status(400).json({ message: "Invalid payment method" });
//     }

//     const order = new Order({
//       user: req.user._id,
//       items: items.map((item) => ({
//         product: item._id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         size: item.size,
//       })),
//       shippingDetails,
//       paymentMethod,
//       paymentResult,
//       totalAmount,
//       status: orderStatus,
//     });

//     const createdOrder = await order.save();

//     res.status(201).json(createdOrder);
//   } catch (error) {
//     console.error("Order creation failed:", error);
//     res
//       .status(400)
//       .json({ message: "Order creation failed", error: error.message });
//   }
// };

// // Get all orders (admin only)
// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("user", "id name");
//     res.json(orders);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update order status (admin only)
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.status = req.body.status;
//       const updatedOrder = await order.save();
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get order by ID
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "name email"
//     );

//     if (order) {
//       res.json(order);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
