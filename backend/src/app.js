import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";
import { connectToSocket } from "./controllers/socketManager.js"; // Socket setup

const app = express();
const server = createServer(app);

// Initialize socket.io
connectToSocket(server); // This handles all socket.io logic

// App config
app.set("port", process.env.PORT || 8000);

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// Routes
app.use("/api/v1/user", userRoutes);

// Mongo + Server start
const start = async () => {
  try {
    const connectionDb = await mongoose.connect("mongodb+srv://rajkumarkathula15:rajkumar@zoomcluster.v6lgjzb.mongodb.net/");
    console.log(`MONGO connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
  } catch (error) {
    console.error("DB Connection failed:", error.message);
  }
};

start();
