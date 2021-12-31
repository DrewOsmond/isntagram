import { Router } from "express";
import userRouter from "./users";

const router = Router();

router.use("/session", userRouter);

export default router;
