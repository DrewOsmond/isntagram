import express from "express";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import apiRouter from "./routes/index";

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}/`)
);
