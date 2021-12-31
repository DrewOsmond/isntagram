import { Router } from "express";
import { login, restore, register } from "../controllers/users";

const router = Router();

router.use("/restore", restore);
router.use("/login", login);
router.use("/register", register);

export default router;
