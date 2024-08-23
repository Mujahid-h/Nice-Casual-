// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           // required: true,
//           ref: "Product",
//         },
//         name: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//         size: { type: String, required: true },
//       },
//     ],
//     shippingDetails: {
//       name: { type: String, required: true },
//       email: { type: String, required: true },
//       phone1: { type: String, required: true },
//       phone2: { type: String },
//       address1: { type: String, required: true },
//       address2: { type: String },
//       country: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//     },
//     paymentMethod: { type: String, required: true },
//     paymentResult: {
//       id: { type: String },
//       status: { type: String },
//       update_time: { type: String },
//       email_address: { type: String },
//     },
//     totalAmount: { type: Number, required: true },
//     status: {
//       type: String,
//       required: true,
//       default: "pending",
//       enum: ["pending", "processing", "shipped", "delivered"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = mongoose.model("Order", orderSchema);

// export default Order;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    shippingDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone1: { type: String, required: true },
      phone2: { type: String },
      address1: { type: String, required: true },
      address2: { type: String },
      country: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
