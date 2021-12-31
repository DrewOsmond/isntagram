import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}/`)
);
