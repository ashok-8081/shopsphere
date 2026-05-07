import express from "express"; // const express = require("express"); also can be but this is new way ... to write
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.send("API is running...");
});
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`server failed to start: ${error.message}`);
  }
};

startServer();
