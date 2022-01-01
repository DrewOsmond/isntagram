import { Router } from "express";

import userRouter from "./api/users";
import postRouter from "./api/posts";

const router = Router();

router.use("/session", userRouter);
router.use("/posts", postRouter);

export default router;
