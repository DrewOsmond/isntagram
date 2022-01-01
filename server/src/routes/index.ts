import { Router } from "express";
import userRouter from "./api/users";

const router = Router();

router.use("/session", userRouter);

export default router;
