import fastfiy from "fastify";
import { Routes } from "./http/routes";
import cors from "@fastify/cors";
import mongoose from "mongoose";
import { env } from "@/env";

export const app = fastfiy();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});

app.register(Routes, {
  prefix: "/api",
});

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
