import { Router } from "express";
import {
  getUser,
  restore,
  login,
  register,
  logout,
} from "../../controllers/user";
import { authenticateUser } from "../../util/auth";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.get("/profile/:username", expressAsyncHandler(getUser));
router.post("/restore", authenticateUser, expressAsyncHandler(restore));
router.post("/login", expressAsyncHandler(login));
router.post("/register", expressAsyncHandler(register));
router.delete("/logout", expressAsyncHandler(logout));

export default router;
