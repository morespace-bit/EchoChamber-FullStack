import { dotEnv } from "./src/config/config";
import "./src/database/connection";
import express from "express";

// import app from "./src/app";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Server is working!");
});

export default app;
