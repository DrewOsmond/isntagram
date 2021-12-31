import { Router } from "express";
import { login, restore, register } from "../controllers/user";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.use(
  "/restore",
  expressAsyncHandler(async (req, res) => {
    restore(req, res);
  })
);
router.use(
  "/login",
  expressAsyncHandler(async (req, res) => {
    login(req, res);
  })
);
router.use(
  "/register",
  expressAsyncHandler(async (req, res) => {
    register(req, res);
  })
);

export default router;
