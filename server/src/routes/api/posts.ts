import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticateUser } from "../../util/auth";
import { createPost, updatePost, deletePost } from "../../controllers/posts";
import { upload } from "../../util/aws";
// import { upload } from "../../util/aws";

const router = Router();

router.post("/", authenticateUser, expressAsyncHandler(createPost));
router.patch("/:id", authenticateUser, expressAsyncHandler(updatePost));
router.delete("/:id", authenticateUser, expressAsyncHandler(deletePost));

router.post(
  "/upload",
  authenticateUser,
  upload.single("photo"),
  function (req, res) {
    res.status(201).json(req.file);
  }
);

export default router;
