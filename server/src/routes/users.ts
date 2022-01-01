import { Router } from "express";
import { login, restore, register } from "../controllers/user";
import { authenticateUser } from "../util/auth";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.use("/restore", authenticateUser, expressAsyncHandler(restore));
router.use("/login", expressAsyncHandler(login));
router.use("/register", expressAsyncHandler(register));

export default router;
