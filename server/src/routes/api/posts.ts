import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticateUser } from "../../util/auth";
import { createPost, updatePost, deletePost } from "../../controllers/posts";

const router = Router();

router.post("/", authenticateUser, expressAsyncHandler(createPost));
router.patch("/post/:id", authenticateUser, expressAsyncHandler(updatePost));
router.delete("/post/:id", authenticateUser, expressAsyncHandler(deletePost));
