import express from "express";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

import apiRouter from "./routes/index";

export const prisma = new PrismaClient();

function main() {
  const app = express();

  app.use(morgan("dev"));
  app.use(apiRouter);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(`listening on port http://localhost:${PORT}/`)
  );
}

main();
