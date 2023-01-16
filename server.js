import mongoose from "mongoose";
import express from "express";
import User from "./models/userModel.js";
import router from "./router.js";
import corse from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcryptjs';

import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

app.use(corse());
app.use(express.json());

app.use("/api", router);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// })

const runApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("connection to MongoDB"));
    http.listen(PORT, () =>
      console.log(`Listening on port http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

runApp();
