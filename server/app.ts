import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import apiRouter from "./src/routes/index";

const app = express();

app.use(morgan("dev"));
app.use(apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}/`)
);
